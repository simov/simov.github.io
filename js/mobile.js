
function isMobile () {
  return /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i
      .test(navigator.userAgent.toLowerCase());
}

function loadScript(url, cb){
  // http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
  var script = document.createElement('script')
  script.type = 'text/javascript';

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        cb();
      }
    }
  } else { // Others
    script.onload = function () {
      cb();
    }
  }

  script.src = url;
  document.body.appendChild(script);
}

var webgl = (function () {
  if (isMobile()) return false;
  try {
    return !! window.WebGLRenderingContext && 
        !! document.createElement('canvas').getContext('experimental-webgl');
  } catch (e) {
    return false;
  }
})();

if (!isMobile()) {
  loadScript('jslib/Three.js', function () {
    loadScript('js/request-animation-frame.js', function () {
      loadScript('js/attractors-trip.js', function () {
        document.getElementById('soundcloud').src = 'https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F4403562&amp;color=040403&amp;auto_play=true&amp;show_artwork=true';
      });
    });
  });
}
