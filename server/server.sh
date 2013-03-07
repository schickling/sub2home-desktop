#! /bin/sh

cd `dirname $0`


# kill old processes
if ps aux | grep "beanstalkd" > /dev/null
	then
	echo "Killing old beanstalkd process"
	killall beanstalkd
fi

if ps aux | grep "php" > /dev/null
	then
	echo "Killing old php process"
	killall php
fi

# dump autoload
composer dump-autoload --optimize

# start queue
beanstalkd &
php artisan queue:listen &

echo "Server running..."