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
    <tr>
      <td></td>
      <td colspan="2">
        <table style="padding: 0 6px 15px">
          <tbody>
            <tr>
              @foreach ($orderedArticleModel->ingredientCategoriesCollection as $ingredientCategoryModel)
              <td style="padding-right: 15px"> 
                <table style="border-bottom: 1px solid #e0e0e0; padding: 5px">
                  <tbody>
                    <tr>
                      <td style="font-size: 10px; padding-right: 5px; color: #999;">{{ $ingredientCategoryModel->title }}</td>
                      <td >
                        @foreach ($ingredientCategoryModel->ingredientsCollection as $ingredientModel)
                        <span style="padding: 2px 3px 0 3px; background-color: none; color: #000; font-weight: bold">{{ $ingredientModel->shortcut }}</span>
                        @endforeach
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              @endforeach
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    @endif
    <!-- / Ingredients -->
  </tbody>
</table>