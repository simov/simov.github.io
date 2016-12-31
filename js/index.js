
var production = true

if (window.location.protocol === 'http:') {
  window.location.href = 'https://simov.github.io'
}

function mobile () {
  return /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i
    .test(navigator.userAgent.toLowerCase())
}

function file (path, done) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      done(null, xhr.responseText)
    }
  }

  xhr.open('GET', path, true)

  try {
    xhr.send()
  }
  catch (err) {
    done(err)
  }
}

function loadScript (url, done) {
  // http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
  var script = document.createElement('script')
  script.type = 'text/javascript'

  if (script.readyState) { // IE
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null
        done()
      }
    }
  }
  else { // Others
    script.onload = function () {
      done()
    }
  }

  script.src = url
  document.body.appendChild(script)
}


window.addEventListener('DOMContentLoaded', function () {
  file('https://outofindex.com/simov/', function (err, body) {
    document.querySelector('#content').innerHTML = body
    content.links()
    content.icons()
    // content.tooltips()
    // content.spaces()
    document.querySelector('#content').style.opacity = 1
  })

  if (!mobile()) {
    var path = production
      ? 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r45/Three.js'
      // curl -O https://raw.githubusercontent.com/mrdoob/three.js/r45/build/Three.js
      : '/Three.js'

    loadScript(path, function () {
      AttractorsTrip()
      soundcloud()
    })
  }
})


var content = {
  links: function () {
    Array.from(document.querySelectorAll('.syntaxhighlighter a'))
      .forEach(function (link) {
        var url = link.getAttribute('href')
        if (url.indexOf('npmjs') !== -1) {
          url += '~simov'
        }
        else if (url.indexOf('plus') !== -1) {
          url += '+SimeonVelichkov'
        }
        else if (url.indexOf('/pulls?q=') !== -1) {
          url += 'is%3Apr+is%3Amerged+author%3Asimov'
        }

        var text = link.parentNode.nextSibling.innerText

        link.parentNode.nextSibling.innerHTML = text.replace(/>(.*)<\//,
          '><a href="' + url + '" target="_blank" title="' + url + '">$1</a>&lt;/')

        link.parentNode.innerHTML = '"&rarr;"'
      })
  },
  icons: function () {
    Array.from(document.querySelectorAll('.line .plain'))
      .forEach(function (elem) {
        var text = elem.innerText
        var match = text.match(/^>\+\d+ ~\d+<\/$/)

        if (match) {
          elem.innerHTML = text
            .replace('+', '<i class="icon-star"></i>')
            .replace('~', '<i class="icon-fork"></i>')
        }

        match = text.match(/^>\*\d+<\/$/)

        if (match) {
          elem.innerHTML = text.replace('*', '<i class="icon-user"></i>')
        }
      })
  },
  linkTooltips: function () {
    // .bt-content { font-size: 12px; line-height: 14px; }
    $('#content .syntaxhighlighter a').bt({
      positions: ['top', 'most'],
      padding: 10,
      width: 'auto',
      spikeLength: 5,
      fill: 'rgba(85, 85, 85)',
      strokeStyle: '#a6e22e',
      cssStyles: {color: '#a6e22e', 'white-space': 'nowrap', 'font-size': 16},
      hoverIntentOpts: {timeout: 0},
      showTip: function (box) {
        $(box).fadeIn(200)
      },
      hideTip: function (box, callback) {
        $(box).animate({opacity: 0}, 200, callback)
      }
    })
  },
  spaces: function () {
    $('.line .spaces').each(function (index) {
      var text = $(this).text()
      var count = text.match(/^(\s*)/g)[0].length
      var indent = mobile() ? 2 : 8
      $(this).text('').parent().css({'padding-left': count*indent})
    })
  },
}

function soundcloud () {
  var btn = document.querySelector('.icon-soundcloud')
  var iframe = document.querySelector('#soundcloud')

  iframe.addEventListener('load', function () {
    btn.style.opacity = 1
  })

  btn.addEventListener('mouseover', function () {
    iframe.style.opacity = 1
    iframe.style.visibility = 'visible'
  })

  iframe.addEventListener('mouseout', function () {
    iframe.style.opacity = 0
    iframe.style.visibility = 'hidden'
  })

  iframe.src = 'https://w.soundcloud.com/player/?' + [
    'url=http%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F4403562',
    'color=040403',
    'auto_play=true',
    'show_artwork=true'
  ].join('&amp;')
}
