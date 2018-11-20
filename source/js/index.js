var TOC_EXPAND = true;
var TOC_SHRINK = !TOC_EXPAND;

var TOC_LOCK = true;
var TOC_UNLOCK = !TOC_LOCK;

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
  this.tocToggle.addEventListener('click', function () {
      self.toggle();
  });
};

TOC.prototype.getLock = function () {
  if (this.lock === TOC_LOCK) {
    return;
  }
  this.lock = TOC_LOCK;
};

TOC.prototype.releaseLock = function () {
  this.lock = TOC_UNLOCK;
};

TOC.prototype.toggle = function () {
  this.getLock();
  if (this.state === TOC_EXPAND) {
    this.tocList.classList.add('shrink');
    this.tocCaret.classList.add('down');
    this.state = TOC_SHRINK;
  } else {
    this.tocList.classList.remove('shrink');
    this.tocCaret.classList.remove('down');
    this.state = TOC_EXPAND;
  }
  this.releaseLock();
};

var toc = new TOC('toc');

toc.init();
