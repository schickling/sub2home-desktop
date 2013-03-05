<?php namespace App\Controllers\Services\Document;


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
		static::generateTCPDFDocument($data, $viewName, $fileDestination);
	}


	private static function generateTCPDFDocument($data, $viewName, $fileDestination)
	{
		$pdf = new TCPDFDocument($data, $viewName, $fileDestination);

		$pdf->prepare();
		$pdf->render();
		$pdf->save();
	}

}