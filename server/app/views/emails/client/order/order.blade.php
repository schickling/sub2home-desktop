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
        <td colspan="2" style="padding-left: 20px">
          <h2 style="font-size: 24px">Bestellung #{{ $orderNumber }}</h2>
        </td>
        <td style="text-align: right; padding-right: 30px; padding-bottom: 24px; width: 200px;"><img src="http://sub2home.com/img/static/common/subway_logo.png"></td>
      </tr>
      <!-- Address -->
      <tr>
        <td colspan="3" style="line-height: 1.2; padding-left: 23px;">
          An&nbsp;<b>{{ $customerFirstName }} {{ $customerLastName }}</b><br><br>
        </td>
      </tr>
      <tr>
        <td style="line-height: 1.2; width: 200px; padding-left: 23px; padding-bottom: 20px;">
          {{ $customerStreet }}<br>
          {{ $customerPostal }} {{ $customerCity }}
        </td>
        <td colspan="2" style="line-height: 1.2; padding-left: 23px; padding-bottom: 20px; text-decoration: none; color: #000;">
          {{ $customerEmail }}<br>
          {{ $customerPhone }}
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size: 24px; padding-left: 20px; padding-bottom: 10px">Bis {{ $dueTime }} Uhr</td>
      </tr>
        <td colspan="3" style="padding-left: 20px;" colspan="2">{{ $comment }}</td>
      </tr>
    </tbody>
  </table>


  <div style="padding: 0 20px">

    @foreach ($orderedItemsCollection as $orderedItemModel)

    <table style="border: 1px solid #e4e4e4; width:100%;  margin-top: 20px" cellspacing="0" cellpadding="0">
      <tr>

        <!-- Amount -->

        <td width="30">

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

        <!-- / Amount -->

        <!-- Title -->

        <td rowspan="2">
          @foreach ($orderedItemModel->orderedArticlesCollection as $orderedArticleModel)
          @include('emails.client.order.orderedArticle', array('orderedArticleModel' => $orderedArticleModel))
          @endforeach
        </td>

        <!-- / Title -->

        <!-- Menu & Price -->

        <td style="border-bottom: 1px  solid #e4e4e4; border-left: 1px solid #e4e4e4; background: #f4f4f4; font-size: 16px; font-weight: bold;" width="70">
          <table style="text-align: right; height: 30px" width="70" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <!-- Price & Menu -->
                @if ($orderedItemModel->isMenu)
                <td style="border-right: 1px solid #e4e4e4; font-weight: normal; padding: 0 7px">{{ $orderedItemModel->menuModel->title }}</td>
                @endif
                <td style="padding: 0 7px">{{ $orderedItemModel->total }}€</td>
                <!-- / Price & Menu -->
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <!-- / Menu & Price -->

      <tr>
        <td></td>
        <td></td>
      </tr>



    </table>

    @endforeach

  </div>

</body>
</html>