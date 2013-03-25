#! /bin/sh

cd `dirname $0`

# check dependencies
command -v composer >/dev/null 2>&1 || { echo >&2 "Error: composer is not installed."; exit 1; }
command -v ant >/dev/null 2>&1 || { echo >&2 "Error: ant is not installed."; exit 1; }

# dump autoload
composer dump-autoload --optimize

# compile laravel
php artisan optimize


# build java lib
echo "Building java libs"
cd "./app/controllers/services/image/lib/zxing/javase"
ant


echo "Server build successful"