"use strict";

(function () {
  var tocCaret = $('#toc .toc-caret');
  tocCaret.click(function () {
    $('#toc .toc').slideToggle(function () {
      if (!tocCaret.hasClass('down')) {
        tocCaret.addClass('down');
      } else if (tocCaret.hasClass('down')) {
        tocCaret.removeClass('down');
      }
    });
  });
  $('#main img').each(function () {
    var element = document.createElement('a');
    $(element).attr('data-fancybox', 'images');
    $(element).attr('href', $(this).attr('src'));
    $(this).wrap(element);
  });
  var imageOpts = $.extend(true, {}, $.fancybox.defaults, {
    caption: function (instance, item) {
      return $(this).next('figcaption').html();
    }
  });
  $('[data-fancybox="images"]').fancybox(imageOpts);
})();
