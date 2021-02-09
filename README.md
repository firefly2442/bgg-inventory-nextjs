# bgg-inventory-nextjs

[![Total alerts](https://img.shields.io/lgtm/alerts/g/firefly2442/bgg-inventory-nextjs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/firefly2442/bgg-inventory-nextjs/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/firefly2442/bgg-inventory-nextjs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/firefly2442/bgg-inventory-nextjs/context:javascript)
[![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/firefly2442/bgg-inventory-nextjs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/firefly2442/bgg-inventory-nextjs/context:python)

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

Build the Docker container

`docker build . --pull -t firefly2442/bgg-inventory-nextjs:latest`

## Running

Run the Docker container

`docker run -d -p 9990:3000 --name=bgg-inventory-nextjs firefly2442/bgg-inventory-nextjs`

View the site on `localhost:9990`

## For Developers

Check for `package.json` updates

`ncu -u`

Run the Nodejs app manually via:

`npm run dev`

## Help

Create a Github issue

## License

`bgg-inventory-nextjs` is licensed under the GPLv3

The BoardGameGeek (BGG) API is [licensed](https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use#)
for use for non-commercial purposes.
