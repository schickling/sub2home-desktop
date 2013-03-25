<table style="border: 1px solid #e4e4e4; width:100%;  margin-top: 20px" cellspacing="0" cellpadding="0">
  <tbody>

    <!-- Item Head -->
    <tr>
      <!-- Title -->
      <td style="font-size: 20px; padding: 15px; font-weight: bold" rowspan="2">{{ $orderedArticleModel->articleModel->categoryModel->title }}: {{ $orderedArticleModel->articleModel->number }} {{ $orderedArticleModel->articleModel->info }}</td>
      <!-- / Title -->
    </tr>
    <tr>
      <td></td>
      <td></td>
    </tr>

    <!-- / Item Head -->

    <!-- Ingredients -->
    @if ($orderedArticleModel->articleModel->allowsIngredients)
    @foreach ($orderedArticleModel->ingredientsCollection as $ingredientModel)
    <span>Zutat: {{ $ingredientModel->title }}</span>
    @endforeach
    <tr>
      <td></td>
      <td colspan="2">
        <table style="padding: 0 6px 15px">
          <tbody>
            <tr>
              <td style="padding-right: 15px"> 
                <table style="border-bottom: 1px solid #e0e0e0; padding: 5px">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">BROT</td>
                      <td >
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">VK</span>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </td>
              <td colspan="2">
                <table style="border-bottom: 1px solid #e0e0e0; padding: 5px; width: 100%">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">GEMÜSE</td>
                      <td>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">TO</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">OL</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">SA</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">PA</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">EG</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table style="padding: 5px">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">KÄSE</td>
                      <td>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">CC</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td>
                <table style="padding: 5px">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">EXTRAS</td>
                      <td>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">DK</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">BC</span>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">DF</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td>
                <table style="padding: 5px">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">SAUCE</td>
                      <td>
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">CS</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    @endif
    <!-- / Ingredients -->
  </tbody>
</table>