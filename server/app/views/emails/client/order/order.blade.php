<!DOCTYPE html>
<html style="padding: 0; margin: 0" lang="en-US">
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: Helvetica, Arial, sans-serif; padding: 30px 0; margin: 0">

  <table cellpadding="0" style="width: 100%; margin-bottom: 50px" cellspacing="0">

    <!-- Pagehead -->

    <tbody>
      <!-- Logo Row -->

      <tr>
        <td style="padding-left: 20px">
          <h2 style="font-size: 24px">Bestellung #{{ $orderNumber }}</h2>
        </td>
        <td style="text-align: right; padding-right: 30px; padding-bottom: 24px"><img src="http://sub2home.com/img/static/common/subway_logo.png"></td>
      </tr>

      <!-- Address & sub2home-Info Row -->
      <tr>

        <!-- sub2home-Info Table -->
        <td></td>

      <td rowspan="2" align="right"><!-- <table cellpadding="0" cellspacing="0" style="width: 395px; height: 217px; border-left: 1px solid #e4e4e4; border-top: 1px solid #e4e4e4; border-bottom: 1px solid #e4e4e4; text-align: center; background-color: #f8f8f8; font-size: 14px; line-height: 1;"><tbody>
        <tr>
          <td colspan="6" style="height: 26px"></td>
        </tr>
        <tr>
          <td style="width: 41px; font-size: 9px; text-align: right;" rowspan="2"></td>
            <td  style="width: 8px;" rowspan="2"></td>
          <td style="width: 128px; text-align: left;" valign="middle" rowspan="2" style="font-weight: bold;">sub2home UG</td>
          <td style="width: 34px; font-size: 9px; text-align: right;" valign="bottom">ADD</td>
            <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="bottom">{{ $storeStreet }}</td>
        </tr>
        <tr>
            
          
          <td style="width: 34px; font-size: 9px; text-align: right;"></td>
          <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="middle">{{ $storePostal }} {{ $storeCity }}</td>
        </tr>
        <tr>
          <td style="width: 41px; font-size: 9px; text-align: right;" valign="bottom">TEL</td>
            <td style="width: 8px;"></td>
          <td style="width: 128px; text-align: left;" valign="bottom">083 318 338 433</td>
          <td style="width: 34px; font-size: 9px; text-align: right;" valign="bottom">KTO</td>
            <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="bottom">100 10 12 606</td>
        </tr>
        <tr>
          <td style="width: 41px; font-size: 9px; text-align: right;" valign="bottom">FAX</td>
            <td style="width: 8px;"></td>
          <td style="width: 128px; height: 22px; text-align: left;" valign="bottom">083 318 338 434</td>
          <td style="width: 34px; font-size: 9px; text-align: right;" valign="bottom">BLZ</td>
            <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="bottom">540 349 00</td>
        </tr>
        <tr>
          <td style="width: 41px; font-size: 9px; text-align: right;" valign="bottom">MAIL</td>
            <td style="width: 8px;"></td>
          <td style="width: 128px; text-align: left;" valign="bottom" >office@sub2home.de</td>
          <td style="width: 34px; font-size: 9px; text-align: right;" valign="bottom">BANK</td>
            <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="bottom">Sparkasse MM</td>
        </tr>
        <tr>
          <td style="width: 41px; font-size: 9px; text-align: right;" valign="bottom"><br/>WEB</td>
            <td style="width: 8px;"></td>
          <td style="width: 128px; text-align: left; height: 22px" valign="bottom">www.sub2home.de</td>
          <td style="width: 34px; font-size: 9px; text-align: right;" valign="bottom"><br/>UST-ID</td>
            <td style="width: 8px;"></td>
          <td style="width: 161px; text-align: left;" valign="bottom">DE 814 879 148</td>
        </tr> 
        <tr>
          <td colspan="6" style="height: 30px"></td>
        </tr>     
      </tbody></table> --></td>
    </tr>
    <tr>
      <td style="width: 317px; line-height: 1.5; padding-left: 20px">
        An<br>
        <b>{{ $customerFirstName }} {{ $customerLastName }}</b><br>
        {{ $customerStreet }}<br>
        {{ $customerPostal }} {{ $customerCity }}
      </td>
    </tr>
  </tbody>
</table>


<div style="padding: 0 20px">

  <!-- ORDER CONTENT START -->
  @foreach ($orderedItemsCollection as $orderedItemModel)

  <!-- DAS MUSSTE RAUS -->
  <table>
    <tr>
      <td rowspan="2" width="30">

        <table style="font-size: 16px; background-color: #f4f4f4; border-bottom: 1px  solid #e4e4e4; border-right: 1px solid #e4e4e4; text-align: center; height: 30px" width="30" cellpadding="3">
          <tbody>
            <tr>
              @if ($orderedItemModel->amount > 1)
              <td>{{ $orderedItemModel->amount }}x</td>
              @endif
            </tr>
          </tbody>
        </table>

      </td>
      <td height="0"></td>
      <td style="border-bottom: 1px  solid #e4e4e4; border-left: 1px solid #e4e4e4; background: #f4f4f4; font-size: 16px; font-weight: bold;" width="70" rowspan="2">
        <table width="70" style="text-align: right; height: 30px" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <!-- Price & Menu -->
              @if ($orderedItemModel->isMenu)
              <td style="border-right: 1px solid #e4e4e4; font-weight: normal; padding: 0 7px">{{ $orderedItemModel->menuModel->title }}</td>
              @endif
              <td style="padding: 0 7px">05.30€</td>
              <!-- / Price & Menu -->
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
  <!-- DAS MUSSTE RAUS ENDE -->


  <!-- ORDER BODY START -->
  @foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel)

  @include('emails.client.orderedArticle', array('orderedArticleModel' => $orderedArticleModel))

  @endforeach


  <!-- ORDER BODY END -->
  @endforeach


</div>


</body>
</html>