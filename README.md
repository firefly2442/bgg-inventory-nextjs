# bgg-inventory-nextjs

A simple board game inventory system that leverages
the [BoardGameGeek (BGG) API](https://boardgamegeek.com/wiki/page/BGG_XML_API2).

## Requirements

* [Docker](https://www.docker.com/)
* [Python](https://www.python.org/)

## Built With

* [Next.js](https://nextjs.org/)
* [Reactjs](https://reactjs.org/)
* [material-ui](https://material-ui.com/)
* [Node.js](https://nodejs.org/)

## Building

Edit `inventory.json` and set your games.  The IDs are from BoardGameGeek.

Run the Python script which will download thumbnails and details about the
games via the BoardGameGeek API.  This may take some time depending
on how many boardgames you have.

`python3 main.py`

Build the Docker container:

```shell
docker build . --pull -t ghcr.io/firefly2442/bgg-inventory-nextjs:latest
```

Or just pull it straight from Github:

```shell
docker pull ghcr.io/firefly2442/bgg-inventory-nextjs:latest
```

Or leverage `docker-compose.yml`:

```shell
docker compose build --pull
```

## Running

Run the Docker container:

```shell
docker run -d --restart unless-stopped -p 9990:3000 -v $(pwd)/allgames.json:/usr/src/app/allgames.json -v $(pwd)/public/thumbnails/:/usr/src/app/public/thumbnails/ --name=bgg-inventory-nextjs ghcr.io/firefly2442/bgg-inventory-nextjs:latest
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

## Help

Create a Github issue

## License

`bgg-inventory-nextjs` is licensed under the GPLv3

The BoardGameGeek (BGG) API is [licensed](https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use#)
for use for non-commercial purposes.
