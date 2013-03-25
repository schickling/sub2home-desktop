#! /bin/sh

cd `dirname $0`

# check dependencies
command -v beanstalkd >/dev/null 2>&1 || { echo >&2 "Error: beanstalkd is not installed."; exit 1; }


# beanstalkd
if [[ $1 == "reset" ]]; then
	# kill old beanstalkd
	if ps aux | grep "beanstalkd" > /dev/null
		then
		echo "Killing old beanstalkd process"
		killall beanstalkd
	fi

	# start beanstalkd
	beanstalkd &
fi


# php listener
if ps aux | grep "php" > /dev/null
	then
	echo "Killing old php process"
	killall php
fi

php artisan queue:listen --timeout 300 & #job times out after 5 minutes


echo "Server running..."