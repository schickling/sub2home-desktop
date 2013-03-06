<?php namespace App\Controllers\Services\Document;

use TCPDF;
use View;

/**
 * Wrapper around the TCPDF class
 */
class TCPDFDocument
{

	private $data;

	private $viewName;

	private $fileDestination;

	private $document;


	/**
	 * Generates a pdf document and saves it
	 * 
	 * @param  array  $data
	 * @param  string $viewName
	 * @param  string $fileDestination
	 * @return void
	 */
	public function __construct($data, $viewName, $fileDestination) {
		$this->data = $data;
		$this->viewName = $viewName;
		$this->fileDestination = $fileDestination;

		// create new PDF document
		$this->document = new TCPDF();
	}

	public function prepare()
	{
		// needed since large files would timeout otherwise
		ini_set('max_execution_time', 300); // 300 seconds (5 minutes)
		ini_set('memory_limit', '1024M');

		// remove default header/footer
		$this->document->setPrintHeader(false);
		$this->document->setPrintFooter(false);

		$this->document->SetMargins(20, 20, 20);
		$this->document->SetAutoPageBreak(true, 20);

		$this->loadFonts();

	}

	public function render()
	{
		// add a page
		$this->document->AddPage();

		$this->renderSVG();
		$this->renderContent();

		// reset pointer to the last page
		$this->document->lastPage();
	}

	private function renderSVG()
	{
		if (array_key_exists('svg', $this->data)) {
			foreach ($this->data['svg'] as $svg) {
				$this->document->ImageSVG($svg['file'], $svg['x'], $svg['y']);
			}
			unset($this->data['svg']);
		}
	}

	private function loadFonts()
	{
		if (array_key_exists('font', $this->data)) {
			foreach ($this->data['font'] as $font) {

				// convert TTF font to TCPDF format and store it on the fonts folder
				$fontname = $pdf->addTTFfont($font, 'TrueTypeUnicode', '', 96);

				// use the font
				$pdf->SetFont($fontname, '', 14, '', false);

			}
			unset($this->data['font']);
		}
		
	}

	private function renderContent()
	{
		// output the HTML content
		$html = View::make($this->viewName, $this->data);
		$this->document->writeHTML($html);
	}

	public function save()
	{
		// Close and save PDF document
		$this->document->Output($this->fileDestination, 'F');
	}

}