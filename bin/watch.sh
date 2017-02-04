#!/bin/sh

budo src/client.js:bundle.js \
  --live --ssl --dir src/assets \
  -- \
  -t [ babelify --plugins [ transform-flow-strip-types ] ]