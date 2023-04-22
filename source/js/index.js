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
  if (window.$ && window.$.fancybox) {
    $('#main img').each(function () {
      var element = document.createElement('a');
      $(element).attr('data-fancybox', 'images');
      $(element).attr('href', $(this).attr('src'));
      $(element).addClass('image-link');
      $(this).wrap(element);
    });
    var imageOpts = $.extend(true, {}, $.fancybox.defaults, {
      caption: function (instance, item) {
        return $(this).next('figcaption').html();
      }
    });
    $('[data-fancybox="images"]').fancybox(imageOpts);
  }
  var themeKey = 'theme';
  document.getElementById('theme').addEventListener('click', function () {
    const html = document.querySelector('html');
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      window.localStorage.setItem(themeKey, 'light');
    } else {
      html.classList.add('dark');
      window.localStorage.setItem(themeKey, 'dark');
    }
  })
})();
