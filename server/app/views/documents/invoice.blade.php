<style>
  .addressField {
    width: 84mm;
    line-height: 1.5;
  }
  .margin {
    width: 20mm;
  }
  .sub2homeInfo {
    width: 105mm;
    height: 43mm;
    border-style: solid none solid solid;
    border-width: 1px 0px 1px 1px;
    border-color: #b0b0b0 #fff #b0b0b0 #b0b0b0;
    text-align: center;
    background-color: #f8f8f8;
    font-size: 9pt;
  }
  .s2hCol1 {
    width: 12mm;
    font-size: 6pt;
    text-align: right;
    line-height: 2.2;
  }
  .s2hCol2 {
    width: 34mm;
    text-align: left;
  }
  .s2hCol3 {
    width: 9mm;
    font-size: 6pt;
    text-align: right;
    line-height: 2.2;
  }
  .s2hSeparator {
    width: 2mm;
  }
  .s2hCol4 {
    width: 46mm;
    text-align: left;
  }
  .storeInfo {
    text-align: left;
    width: 103mm;
    font-size: 10pt;
    font-weight: bold;
  }
  .siSeparator {
    width: 3mm;
  }
  .siTag1 {
    font-size: 6pt;
    line-height: 2.3;
    font-weight: normal;
    width: 55mm;
    text-align: right;
  }
  .siTag2 {
    font-size: 6pt;
    line-height: 2.3;
    font-weight: normal;
    width: 8mm;
    text-align: right;
  }
.numbersText {
  width: 65mm;
  font-size: 12pt;
  line-height: 1.3;
}
.nmbrs {
  text-align: left;
  width: 105px;
}
.nmbrsMargin {
  width: 3mm;
}
.nmbrsCol1 {
  width: 45mm;
}
.nmbrsCol2 {
  width: 33mm;
  text-align: right;
}
.fazit {
  font-size: 12pt;
  width: 160mm;
}
</style>
<div><table cellpadding="0" cellspacing="0">

<!-- Pagehead -->

  <tbody>
  <!-- Logo Row -->

    <tr>
      <td colspan="2" style="height: 31mm;"></td>
      <td style="height: 31mm;"></td>
    </tr>

  <!-- Address & sub2home-Info Row -->
    <tr>
      <td style="width: 26mm; height: 11mm"></td>
      <td style="width: 84mm; height: 11mm"></td>

      <!-- sub2home-Info Table -->

      <td rowspan="2"><table class="sub2homeInfo"><tbody>
        <tr>
          <td colspan="6" style="height: 7mm"></td>
        </tr>
        <tr>
          <td class="s2hCol1" rowspan="2"></td>
            <td class="s2hSeparator" rowspan="2"></td>
          <td class="s2hCol2" valign="middle" rowspan="2" style="font-weight: bold;">sub2home UG</td>
          <td class="s2hCol3" valign="bottom">ADD</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol4">Maximilianstraße 7</td>
        </tr>
        <tr>
            
          
          <td class="s2hCol3"></td>
          <td class="s2hSeparator"></td>
          <td class="s2hCol4" style="height: 6mm">87700 Memmingen</td>
        </tr>
        <tr>
          <td class="s2hCol1">TEL</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol2">083 318 338 433</td>
          <td class="s2hCol3">KTO</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol4">100 10 12 606</td>
        </tr>
        <tr>
          <td class="s2hCol1">FAX</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol2" style="height: 6mm">083 318 338 434</td>
          <td class="s2hCol3">BLZ</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol4">540 349 00</td>
        </tr>
        <tr>
          <td class="s2hCol1">MAIL</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol2">office@sub2home.de</td>
          <td class="s2hCol3">BANK</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol4">Sparkasse MM</td>
        </tr>
        <tr>
          <td class="s2hCol1"><br/>WEB</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol2">www.sub2home.de</td>
          <td class="s2hCol3"><br/>UST-ID</td>
            <td class="s2hSeparator"></td>
          <td class="s2hCol4">DE 814 879 148</td>
        </tr> 
        <tr>
          <td colspan="6" style="height: 7mm"></td>
        </tr>     
    </tbody></table></td>
    </tr>
    <tr>
      <td style="width: 26mm"></td>
      <td class="addressField">
        <b>{{$addressFirstName}} {{$addressLastName}}</b><br>
        {{$addressStreet}}<br>
        {{$addressPostal}} {{$addressCity}}
      </td>
    </tr>
  </tbody>
</table>

<!-- Title & Store-Info -->
  
<table>
  <tbody>
    <tr>
      <td colspan="4" style="height: 17mm"></td>
    </tr>
    <tr>
      <td class="margin"></td>
      <td style="width: 65mm"></td>
      
      <!-- Store Info -->
      
      <td class="storeInfo"><table cellpadding="0" cellspacing="0"><tbody>
        <tr>
          <td colspan="6" style="text-align: right">Store {{$infoStoreTitle}} ({{$infoStoreNumber}})</td>
        </tr>
        <tr>
          <td style="height: 2mm" colspan="6"></td>
        </tr>
        <tr>
          <td class="siTag1">ZEITRAUM</td>
          <td class="siSeparator"></td>
          <td style="width: 18mm">{{$infoTimeSpan}}</td>
          <td class="siTag2">RG-NR</td>
          <td class="siSeparator"></td>
          <td style="width: 16mm">{{$infoInvoiceNumber}}</td>
        </tr>
        <tr>
          <td class="siTag1">DATUM</td>
          <td class="siSeparator"></td>
          <td style="width: 18mm">{{$infoInvoiceDate}}</td>
          <td class="siTag2">KD-NR</td>
          <td class="siSeparator"></td>
          <td style="width: 16mm">{{$infoClientNumber}}</td>
        </tr>
      </tbody></table></td>
      <td style="width: 22mm;"></td>
    </tr>
  </tbody>
</table>

<!-- Numbers -->

<table>
  <tbody>
    <tr>
      <td style="height: 19mm" colspan="5"></td>
    </tr>
    <tr>
      <td style="width: 25mm"></td>
      <td class="numbersText">Wir vermittelten  Ihnen auf<br/>unserer Bestellplattform folgende<br/>Lieferungen im oben aufgeführten<br/>Zeitraum und stellen Ihnen diese<br/>hiermit in Rechnung.</td>
      <td style="width: 16mm"></td>
      <td><table class="nmbrs"><tbody>
        <tr>
          <td class="nmbrsMargin"></td>
          <td class="nmbrsCol1">Summe Lieferungen</td>
          <td class="nmbrsCol2"><b>{{$total}}€</b></td>
          <td class="nmbrsMargin"></td>
        </tr>
        <tr>
          <td class="nmbrsMargin" rowspan="2"></td>
          <td class="nmbrsCol1" style="font-size: 7pt; line-height:3.9" rowspan="2">Daraus ergibt sich folgende Provision:</td>
          <td colspan="2" style="border-bottom: 1px solid #ccc"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td class="nmbrsMargin"></td>
          <td class="nmbrsCol1">Summe Netto</td>
          <td class="nmbrsCol2">{{$netAmount}}€</td>
          <td class="nmbrsMargin"></td>
        </tr>
        <tr>
          <td class="nmbrsMargin"></td>
          <td class="nmbrsCol1">MwSt (19%)</td>
          <td class="nmbrsCol2">{{$tax}}€</td>
          <td class="nmbrsMargin"></td>
        </tr>
        <tr>
          <td colspan="4" cellpadding="0" cellspacing="0" style="line-height: 0.1; border-bottom: 1px solid #ccc; height: 3mm"></td>
        </tr>
        <tr>
          <td colspan="4" cellpadding="0" cellspacing="0" style="line-height: 0.1; height: 2mm"></td>
        </tr>
        <tr>
          <td class="nmbrsMargin"></td>
          <td class="nmbrsCol1">Summe Brutto</td>
          <td class="nmbrsCol2" style="font-weight: bold" cellpadding="3">{{$grossAmount}}€</td>
          <td class="nmbrsMargin"></td>
        </tr>
      </tbody></table></td>
      <td class="margin"></td>
    </tr>
  </tbody>
</table>

<table>
  <tbody>
    <tr>
      <td colspan="3" style="height: 16mm"></td>
    </tr>
    <tr>
      <td style="width: 25mm"></td>
      <td class="fazit">Der Rechnungsbetrag in Höhe von {{$grossAmount}}€ wird in den nächsten Tagen von ihrem Konto (Nr. {{$bankaccountAccountNumber}}, BLZ {{$bankaccountBankCodeNumber}}, {{$bankaccountBankName}}) abgebucht. <br/>Vielen Dank für Ihre Zusammenarbeit.</td>
      <td style="width: 25mm"></td>
    </tr>
  </tbody>
</table>


</div>

