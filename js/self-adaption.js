(function(document, window) {
  var sResizeEventName = 'orientationchange' in window ? 'orientationchange' : 'resize';

  function fnPureResetRemValue() {
    var clientWidth = window.innerWidth;
    if (!clientWidth) return;
    if (clientWidth >= 750) {
      document.documentElement.style.fontSize = '100px';
    } else {
      document.documentElement.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  }

  fnPureResetRemValue();

  window.addEventListener(sResizeEventName, fnPureResetRemValue, false);
})(document, window);
