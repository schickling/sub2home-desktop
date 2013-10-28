define ["jquery"], ->

  $.fn.lazyload = ->

    $content = this
    images = $content.find('img')
    loaded = inview = source = null

    images.one('load', ->
      source = this.getAttribute('data-src')
      this.setAttribute('src', source)
      this.removeAttribute('data-src')
      this.className = 'itemPreview'
    )

    unveil = ->

      # needs to be calculated here because it might change with resizing
      viewHeight = window.innerHeight
      contentOffsetTop = $content.offset().top

      inview = images.filter ->
        $image = $(this)
        imageOffsetTop = $image.offset().top
        imageOffsetTop - contentOffsetTop < viewHeight

      loaded = inview.trigger('load')
      images = images.not(loaded)

    $content.scroll(unveil)
    $content.resize(unveil)

    unveil()

    this


