#! /bin/sh

cd `dirname $0`


if ps aux | grep "beanstalkd" > /dev/null
	then
	killall beanstalkd
fi

if ps aux | grep "php" > /dev/null
	then
	killall php
fi

beanstalkd &
php artisan queue:listen &

echo "Server running..."