FROM node:latest

ENV PORT 3000

RUN apt update && \
    apt install -y --no-install-recommends meson build-essential pkg-config libglib2.0-dev libexpat1-dev libgirepository1.0-dev curl dos2unix python3-requests && \
    apt upgrade -y && \
    apt autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# on ARM64, it fails with a message about not having Sharp
# this fixes the issue by building libvips from source and
# manually installing Sharp
# https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball
RUN wget https://github.com/libvips/libvips/archive/refs/tags/v8.17.3.tar.gz
RUN tar zxf v8.17.3.tar.gz && \
    rm v8.17.3.tar.gz && \
    cd libvips-8.17.3 && \
    meson setup build && \
    cd build && \
    meson compile && \
    meson install

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
# the --only=production flag means this will not install the devDependencies
# TODO: --legacy-peer-deps is a hack to force the install around a dependency resolution
RUN npm install --only=production --legacy-peer-deps

COPY ./public/collection.csv /usr/src/app/public/collection.csv

COPY . /usr/src/app

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1

RUN dos2unix startup.sh && chmod +x startup.sh

CMD ["./startup.sh"]
