#!/bin/sh

budo src/client.js:bundle.js \
  --live --ssl \
  -- \
  -t [ babelify --plugins [ transform-flow-strip-types ] ]