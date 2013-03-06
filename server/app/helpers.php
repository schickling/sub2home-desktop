<?php 


function getTotalNumberOfMonthsFromDateTime($dateTime)
{
	return (int) $dateTime->format('n') + (int) $dateTime->format('Y') * 12;
}

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