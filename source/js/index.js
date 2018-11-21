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

  var toc = new TOC('toc');

  toc.init();
})();
