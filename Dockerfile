FROM node:latest

ENV PORT 3000

# on ARM64, it fails with a message about not having Sharp
# this fixes the issue by building libvips from source and
# manually installing Sharp
# https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball
RUN wget https://github.com/libvips/libvips/releases/download/v8.10.5/vips-8.10.5.tar.gz
RUN tar zxf vips-8.10.5.tar.gz
RUN cd vips-8.10.5 && \
    ./configure && \
    make && \
    make install && \
    ldconfig

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install sharp

COPY package*.json /usr/src/app/
# the --only=production flag means this will not install the devDependencies
RUN npm install --only=production

COPY . /usr/src/app

# opt out of telemetry/metrics from nextjs
# https://nextjs.org/telemetry
RUN npx next telemetry disable & npm run build
EXPOSE 3000

RUN chmod +x startup.sh

CMD ["./startup.sh"]