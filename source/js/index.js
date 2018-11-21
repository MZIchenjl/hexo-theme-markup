"use strict";

(function () {
  var TOC_EXPAND = true;
  var TOC_SHRINK = false;
  var TOC_LOCK = true;
  var TOC_UNLOCK = false;
  var TOC_TIMER = null;

  function TOC(id) {
    this.state = TOC_EXPAND;
    this.lock = TOC_UNLOCK;

    this.tocContainer = document.getElementById(id);
    if (!this.tocContainer) {
      return;
    }
    this.tocList = this.tocContainer.getElementsByClassName('toc').item(0);
    this.tocToggle = this.tocContainer.getElementsByClassName('toc-toggle').item(0);
    this.tocCaret = this.tocContainer.getElementsByClassName('toc-caret').item(0);
  }

  TOC.prototype.init = function () {
    var self = this;
    if (!this.tocContainer) {
      return;
    }
    this.listHeight = this.tocList.clientHeight;
    this.tocList.style.height = this.listHeight + 'px';
    window.addEventListener('resize', function () {
      self.tocList.style.height = self.state ? '' : '0px';
      self.listHeight = self.tocList.clientHeight;
      self.tocList.style.height = self.listHeight + 'px';
    });
    this.tocToggle.addEventListener('click', function () {
      self.toggle();
    });
  };

  TOC.prototype.getLock = function () {
    if (this.lock === TOC_LOCK) {
      return false;
    }
    this.lock = TOC_LOCK;
    return true;
  };

  TOC.prototype.releaseLock = function () {
    var self = this;
    TOC_TIMER = setTimeout(function () {
      clearTimeout(TOC_TIMER);
      self.lock = TOC_UNLOCK;
    }, 200);
  };

  TOC.prototype.toggle = function () {
    if (!this.getLock()) {
      return;
    }
    if (this.state === TOC_EXPAND) {
      this.tocList.style.height = '0px';
      this.tocList.classList.add('shrink');
      this.tocCaret.classList.add('down');
      this.state = TOC_SHRINK;
    } else {
      this.tocList.classList.remove('shrink');
      this.tocList.style.height = this.listHeight + 'px';
      this.tocCaret.classList.remove('down');
      this.state = TOC_EXPAND;
    }
    this.releaseLock();
  };

  function ImagePreviewer() {
    var container = document.getElementsByClassName('post-content').item(0);
    this.images = Array.prototype.map.call(container.getElementsByTagName('img'), function (img) {
      return img;
    });
    this.showIdx = null;
    this.popup = null;
    this.preImage = null;
    this.previewTimer = null;
    this.lock = false;
  }

  ImagePreviewer.prototype.initPopup = function () {
    var self = this;
    this.popup = document.createElement('div');
    this.preImage = document.createElement('img');
    this.preImage.classList.add('preview-image');
    this.popup.classList.add('image-previewer', 'popup');
    this.preImageContainer = document.createElement('div');
    this.preImageContainer.classList.add('preview-image-container');
    this.preImageContainer.append(this.preImage);
    this.popup.append(this.preImageContainer);
    var shouldClose = null;
    this.popup.addEventListener('click', function () {
      if (shouldClose === null) {
        shouldClose = true;
      }
      if (shouldClose && !self.lock && self.showIdx !== null) {
        self.hide(function () {
          shouldClose = null;
        });
      } else {
        shouldClose = null;
      }
    });
    this.preImageContainer.addEventListener('click', function () {
      shouldClose = false;
    });
    document.body.append(this.popup);
  };

  ImagePreviewer.prototype.hide = function (callback) {
    var self = this;
    self.lock = true;
    self.popup.classList.remove('show');
    document.body.style.overflow = '';
    self.previewTimer = setTimeout(function () {
      clearTimeout(self.previewTimer);
      self.lock = false;
      self.showIdx = null;
      self.popup.style.display = 'none';
      callback && callback();
    }, 500);
  };

  ImagePreviewer.prototype.init = function () {
    var self = this;
    this.initPopup();
    this.images.forEach(function (image, idx) {
      image.addEventListener('click', function () {
        if (self.showIdx !== null) {
          return;
        }
        self.showIdx = idx;
        self.preImage.src = image.src;
        self.popup.style.display = 'flex';
        this.previewTimer = setTimeout(function () {
          clearTimeout(this.previewTimer);
          document.body.style.overflow = 'hidden';
          self.popup.classList.add('show');
        });
      });
    });
  };

  var toc = new TOC('toc');
  var imgPreviewr = new ImagePreviewer();

  toc.init();
  imgPreviewr.init();
})();
