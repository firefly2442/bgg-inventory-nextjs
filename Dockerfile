FROM node:latest

ENV PORT 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

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