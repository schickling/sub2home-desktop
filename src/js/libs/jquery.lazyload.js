define(["jquery"], function () {

  $.fn.lazyload = function () {

    var $content = this,
      images = $content.find('img'),
      loaded, inview, source;

    images.one('load', function () {
      source = this.getAttribute('data-src');
      this.setAttribute('src', source);
      this.removeAttribute('data-src');
      this.className = 'itemPreview';
    });

    function unveil() {

      // needs to be calculated here because it might change with resizing
      var viewHeight = window.innerHeight,
        contentOffsetTop = $content.offset().top;

      inview = images.filter(function () {
        var $image = $(this),
          imageOffsetTop = $image.offset().top;

        return imageOffsetTop - contentOffsetTop < viewHeight;
      });

      loaded = inview.trigger('load');
      images = images.not(loaded);
    }

    $content.scroll(unveil);
    $content.resize(unveil);

    unveil();

    return this;
  };

});