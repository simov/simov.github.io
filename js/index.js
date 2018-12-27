
if (location.protocol === 'http:' && location.hostname === 'simov.github.io') {
  location.href = 'https://simov.github.io'
}

window.addEventListener('DOMContentLoaded', function () {
  file(config.origin + '/simov/io.html', function (err, body) {
    document.querySelector('#content').innerHTML = body
    content.links()
    content.icons()
    content.spaces()
    if (!mobile()) {
      content.tooltips()
    }
  })

  if (!mobile()) {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r45/Three.js', function () {
      AttractorsTrip()
      soundcloud()
      setTimeout(function () {
        document.querySelector('#webgl').style.opacity = 1
        setTimeout(function () {
          document.querySelector('#content').style.opacity = 1
        }, 1000)
      }, 1000)
    })
  }
  else {
    document.querySelector('#content').style.opacity = 1
  }
})

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
        var match = text.match(/^>\+[\d,]+ ~[\d,]+<\/$/)

        if (match) {
          elem.innerHTML = text
            .replace('+', '<i class="icon-star"></i>')
            .replace('~', '<i class="icon-fork"></i>')
        }

        match = text.match(/^>\*[\d,]+<\/$/)

        if (match) {
          elem.innerHTML = text.replace('*', '<i class="icon-user"></i>')
        }
      })
  },
  tooltips: function () {
    var links = Array.from(document.querySelectorAll('.syntaxhighlighter a'))

    links.forEach(function (link) {
      link.addEventListener('mouseover', function () {
        var tooltip = link.parentNode.querySelector('.tooltip')
        if (!tooltip) {
          var url = link.getAttribute('title')
          link.removeAttribute('title')
          link.parentNode.style.position = 'relative'
          link.parentNode.appendChild(create(url))
          tooltip = link.parentNode.querySelector('.tooltip')
          position(link, tooltip)
        }
        tooltip = link.parentNode.querySelector('.tooltip')
        tooltip.style.opacity = 1
        tooltip.style.visibility = 'visible'
      })

      link.addEventListener('mouseout', function () {
        var tooltip = link.parentNode.querySelector('.tooltip')
        tooltip.style.opacity = 0
        tooltip.style.visibility = 'hidden'
      })
    })

    function create (url) {
      var elem = document.createElement('div')
      elem.className = 'tooltip'
      elem.innerText = url
      return elem
    }

    function position (link, tooltip) {
      var padding = parseInt(window.getComputedStyle(tooltip)
        .getPropertyValue('padding-left').replace('px', ''))
      tooltip.style.left = - (
        (tooltip.offsetWidth / 2) - padding - (link.offsetWidth / 2)) + 'px'
    }
  },
  spaces: function () {
    Array.from(document.querySelectorAll('.line .spaces'))
      .forEach(function (line) {
        var text = line.innerText
        var count = text.match(/^(\s*)/g)[0].length
        var indent = mobile() ? 2 : 8
        line.innerText = ''
        line.parentNode.style.paddingLeft = (count * indent) + 'px'
      })
  },
}

function soundcloud () {
  var btn = document.querySelector('.icon-soundcloud')
  var iframe = document.querySelector('#soundcloud')

  iframe.addEventListener('load', function () {
    btn.style.opacity = 1
    setTimeout(() => {
      iframe.style.visibility = 'visible'
      setTimeout(() => {
        iframe.style.visibility = 'hidden'
      }, 500)
    }, 500)
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
