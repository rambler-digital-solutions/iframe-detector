window.addEventListener('load', function() {
  var allFrames = document.querySelectorAll('iframe[data-detection=true][src]');
  detectFrames(allFrames);
});

function detectFrames(allFrames) {
  for (var i = 0, len = allFrames.length; i < len; i++) {
    allFrames[i].setAttribute('visible', false);
  }
  prepairSending(allFrames);

  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(function() {
      prepairSending(allFrames);
    });
  });

  function prepairSending(inputFrames) {
    var frames = inputFrames;
    var postMessageData = {};

    for (var i = 0, len = frames.length; i < len; i++) {
      var thisFrame = frames[i];
      var src = thisFrame.getAttribute('src');
      var visible = thisFrame.getAttribute('visible');

      if (isInViewport(thisFrame)) {
        if (visible === 'false') {
          thisFrame.setAttribute('visible', true);
          postMessageData.visible = true;
          sendMessage(thisFrame, postMessageData, src)
        }
      } else {
        if (visible === 'true') {
          thisFrame.setAttribute('visible', false);
          postMessageData.visible = false;
          sendMessage(thisFrame, postMessageData, src)
        }
      }
    }
  }

  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var halfHeight = element.offsetHeight / 2;
    var elementVisibility = (rect.top + halfHeight) >= 0
      && (rect.bottom - halfHeight) <= (window.innerHeight || document.documentElement.clientHeight);
    return elementVisibility;
  }

  function sendMessage(frame, data, src) {
    frame.contentWindow.postMessage(data, src);
  }
}