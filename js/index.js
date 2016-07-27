
;(function(init, $) {
  $(function () {
    init.repositories()
    init.iframe()
    init.buttons()
    init.btnTooltip()
  })
}(
(function init ($) {
  return {
    repositories: function () {
      var self = this
      $.ajax({
        type: 'GET',
        url: 'http://simov.outofindex.com',
        dataType: 'json',
        success: function (res) {
          if (res.status == 'success') {
            $('#content').append(res.body)
          }
          self.links()
          self.linkTooltips()
          self.spaces()
          self.icons()
          self.show()
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown)
        }
      })
    },
    show: function () {
      $('#content').animate({opacity: 1}, 5000, function () {

      })
    },
    iframe: function () {
      var soundcloud = $('#soundcloud').iframe({
        onload: function (e) {
          window.setTimeout(function () {
            $('#soundcloud').css({display: 'none', visibility: 'visible'})
            $('#btn-music').fadeIn()
          }, 2000)
        }
      })
    },
    links: function () {
      $('.syntaxhighlighter a').each(function (index) {
        var url = $(this).attr('href')
        var title = $(this).parent().next()
        if (url.indexOf('npmjs')!=-1) url += '~simov'
        if (url.indexOf('plus')!=-1) url += '+SimeonVelichkov'
        if (url.indexOf('/pulls?q=')!=-1) url += 'is%3Apr+is%3Amerged+author%3Asimov'

        var link = title.text()
          .replace(/>(.*)<\//, '><a href="' + url +
          '" target="_blank" title="' + url + '">$1</a>&lt;/')
        title.html(link)

        $(this).replaceWith('&rarr;')
      })
    },
    buttons: function () {
      $('#btn-music').on('mouseover', function (e) {
        $('#soundcloud').fadeIn()
      })
      $('#soundcloud').on('mouseout', function (e) {
        $('#soundcloud').fadeOut()
      })
      $('#btn-music, #btn-info').on('click', function (e) {
        return false
      })
    },
    btnTooltip: function () {
      $('#btn-info').bt({
        positions: ['top', 'most'],
        padding: 5,
        width: 'auto',
        spikeLength: 10,
        fill: 'rgba(117, 113, 94, .5)',
        cssStyles: {color: '#f8f8f2', 'white-space': 'nowrap'},
        hoverIntentOpts: {timeout: 1000},
        showTip: function (box) {
          $(box).fadeIn(500)
        },
        hideTip: function (box, callback) {
          $(box).animate({opacity: 0}, 500, callback)
        }
      })
    },
    linkTooltips: function () {
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
        var indent = isMobile() ? 2 : 8
        $(this).text('').parent().css({'padding-left': count*indent})
      })
    },
    icons: function () {
      $('.line .plain').each(function (index) {
        var text = $(this).text()
        var match = text.match(/^>\+\d+ ~\d+<\/$/)

        if (match) {
          $(this).html(text
            .replace('+', '<i class="icon-star"></i>')
            .replace('~', '<i class="icon-fork"></i>')
          )
        }

        match = text.match(/^>\*\d+<\/$/)

        if (match) {
          $(this).html(text.replace('*', '<i class="icon-user"></i>'))
        }

      })
    }
  }
}(jQuery)), jQuery));
