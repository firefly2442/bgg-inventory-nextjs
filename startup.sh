#!/bin/bash

# opt out of telemetry/metrics from nextjs
# https://nextjs.org/telemetry
npx next telemetry disable

npm run build

# for development
#npm run dev

# for production
npm start
