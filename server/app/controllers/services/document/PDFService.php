<?php namespace App\Controllers\Services\Document;

use TCPDF;
use View;


class PDFService
{
	/**
	 * Generates a pdf document and saves it
	 * 
	 * @param  array  $data
	 * @param  string $viewName
	 * @param  string $fileDestination
	 * @return void
	 */
	public static function generateDocument($data, $viewName, $fileDestination)
	{
		// create new PDF document
		$pdf = new TCPDF();

		// add a page
		$pdf->AddPage();

		// output the HTML content
		$html = View::make($viewName, $data);
		$pdf->writeHTML($html);

		// reset pointer to the last page
		$pdf->lastPage();

		// Close and save PDF document
		$pdf->Output($fileDestination, 'F');

	}
}