// 移动端阻止手势放大缩小
(function(document, window) {
  window.onload = function() {
    document.addEventListener('touchstart', function(event) {
      // 如果大于等于两个手指，阻止事件进行
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener(
      'touchend',
      function(event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    document.addEventListener('gesturestart', function(event) {
      event.preventDefault();
    });
  };
})(document, window);
