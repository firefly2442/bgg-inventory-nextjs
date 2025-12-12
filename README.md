# bgg-inventory-nextjs

A simple board game inventory system that leverages
the [BoardGameGeek (BGG) API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

## Requirements

* [Docker](https://www.docker.com/)

## Built With

* [Next.js](https://nextjs.org/)
* [Reactjs](https://reactjs.org/)
* [material-ui](https://material-ui.com/)
* [Node.js](https://nodejs.org/)

## Building

Create an account on Board Game Geek (BGG) and add each game individually
to your personal collection.  Go into your profile and download the CSV list
of your collection.  Place the `collection.csv` file in `./public/collection.csv`.
Overwrite the existing file there.

Build the Docker container:

```shell
docker build . --pull -t ghcr.io/firefly2442/bgg-inventory-nextjs:latest
```

Or leverage `docker-compose.yml`:

```shell
docker compose build --pull
```

## Running

Run the Docker container:

```shell
docker run -d --restart unless-stopped -p 9990:3000 --name=bgg-inventory-nextjs ghcr.io/firefly2442/bgg-inventory-nextjs:latest
```

Or leverage the provided `docker-compose.yml`:

```shell
docker compose up -d
```

Or just leverage the provided Helm chart, see `chart`.

View the site on: [http://localhost:9990](http://localhost:9990)

## For Developers

Install dependencies

`npm install --legacy-peer-deps`

Install NPM check updates

`sudo npm install -g npm-check-updates`

Check for `package.json` updates

`ncu -u`

Run the Nodejs app manually via:

`npm run dev`

Run local Trivy security scanning:

`trivy image --ignore-unfixed ghcr.io/firefly2442/bgg-inventory-nextjs:latest`

BGG used to offer [their API](https://boardgamegeek.com/using_the_xml_api) without
requiring an access token, however, that is now required through app registration.
Downloading your personal CSV list of games from the site is still allowed.

## Help

Create a Github issue

## License

`bgg-inventory-nextjs` is licensed under the GPLv3

The BoardGameGeek (BGG) API is [licensed](https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use#)
for use for non-commercial purposes.
