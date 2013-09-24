```sh
#! /bin/sh

cd `dirname $0`

# check dependencies
command -v npm >/dev/null 2>&1 || { echo >&2 "Error: npm is not installed."; exit 1; }
command -v phantomjs >/dev/null 2>&1 || { echo >&2 "Error: phantomjs is not installed."; exit 1; }
command -v grunt >/dev/null 2>&1 || { echo >&2 "Error: grunt is not installed."; exit 1; }
command -v bower >/dev/null 2>&1 || { echo >&2 "Error: bower is not installed."; exit 1; }

# delete old node modules
rm -rf './node_modules'

npm install
bower install

grunt dev

echo "Frontend dependencies installed..."
```