
;(function($) {
  'use strict';

  $.fn.iframe = function(options) {
  // public
  var properties = $.extend({
    // events
    onload : null
  }, options || {});

  // public
  var api = {
    load: function (url) {
      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'html',
        success: function(data) {
          self.attr('src', url);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR, textStatus, errorThrown);
        }
      });
    }
  };

  // this alias
  var self = $.extend(this, properties, api);

  // events
  if (msie()) {
    var frameInterval = window.setInterval(function () {
      var iframe = $(self).contents();
      if ($('head', iframe).length) {
        window.clearInterval(frameInterval);
        if($.isFunction(s.onload)) s.onload(e);
      }
    }, 200);
  } else {
    self.on('load', function (e) {
      if ($(self).attr('src') == '#') {
        return false;
      }
      if($.isFunction(self.onload)) self.onload(e);
    });
  }
  
  // private api
  function msie () {
    return ($.browser.msie &&
      ($.browser.version == '7.0' || $.browser.version == '8.0'))
      ? true : false;
  }
  
  // extended this
  return self;
  };
})(jQuery);
