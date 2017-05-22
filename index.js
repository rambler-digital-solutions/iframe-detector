window.addEventListener('load', function() {
  var allFrames = document.getElementsByTagName('iframe');

  sendMessage(allFrames);

  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(function() {
      sendMessage(allFrames);
    });
  });


  function sendMessage(inputFrames) {
    var frames = inputFrames;
    var postMessageData = {};

    for (var i = 0, len = frames.length; i < len; i++) {
      var thisFrame = frames[i];
      var src = thisFrame.getAttribute('src');
      var visible = thisFrame.getAttribute('visible');

      if (isInViewport(thisFrame)) {
        if (visible === 'false') {
          postMessageData.visible = true;
          thisFrame.contentWindow.postMessage(postMessageData, src);
          thisFrame.setAttribute('visible', true);
        }
      } else {
        if (visible === 'true') {
          thisFrame.setAttribute('visible', false);
          postMessageData.visible = false;
          thisFrame.contentWindow.postMessage(postMessageData, src);
        }
      }
    }
  }


  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    var elementVisibility = rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || html.clientHeight)
      && rect.right <= (window.innerWidth || html.clientWidth);
    return elementVisibility;
  }
});