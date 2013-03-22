<?php 

if ( ! function_exists('getTotalNumberOfMonthsFromDateTime'))
{
	function getTotalNumberOfMonthsFromDateTime($dateTime)
	{
		return (int) $dateTime->format('n') + (int) $dateTime->format('Y') * 12;
	}
}


if ( ! function_exists('makeDateTimeFromTotalNumberOfMonths'))
{
	function makeDateTimeFromTotalNumberOfMonths($totalNumberOfMonths)
	{
		$day = 1;
		$month = $totalNumberOfMonths % 12;
		$year = (int) ($totalNumberOfMonths / 12);

		if ($month == 0) {
			$month = 12;
			$year--;
		}

		$dateTime = new DateTime();
		$dateTime->setDate($year, $month, $day);

		return $dateTime;
	}
}



if ( ! function_exists('checkArrayStructure'))
{
	function checkArrayStructure($arrayStructure, $arrayToCheck) {

		foreach ($arrayStructure as $key => $value) {

			// prepare 'empty' values
			if (is_numeric($key) && ! is_array($value)) {
				$key = $value;
			}

			// check if key exists
			if (!array_key_exists($key, $arrayToCheck)) {
				return false;
			}

			// call recursive
			if (is_array($value)) {
				if (!checkArrayStructure($arrayStructure[$key], $arrayToCheck[$key])) {
					return false;
				}
			}
		}

		return true;
	}
}