FROM node:latest

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
# the --only=production flag means this will not install the devDependencies
RUN npm install --only=production

COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD ["./startup.sh"]