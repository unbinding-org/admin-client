#!/bin/sh

budo src/client.js:bundle.js \
  --live --ssl --pushstate --dir src/assets \
  -- \
  -t [ babelify --plugins [ transform-flow-strip-types ] ]