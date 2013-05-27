
var webgl = (function () {
    try {
        return !! window.WebGLRenderingContext && 
                !! document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
})();


(function(init, $) {
    $(function () {
        init.show();
        init.iframe();
        init.links();
        init.buttons();
        init.tooltips();
        init.spaces();
    });
}(
(function init ($) {
    return {
        show: function () {
            window.setTimeout(function () {
                $('#content').animate({opacity: 1}, 5000, function () {
                    
                });
            }, 2000);
        },
        iframe: function () {
            var soundcloud = $('#soundcloud').iframe({
                onload: function (e) {
                    window.setTimeout(function () {
                        $('#soundcloud').css({display: 'none', visibility: 'visible'});
                        $('#btn-music').fadeIn();
                    }, 2000);
                }
            });
        },
        links: function () {
            $('.syntaxhighlighter a').each(function (index) {
                var url = $(this).attr('href'),
                    title = $(this).parent().next();

                var link = title.text()
                    .replace(/>(.*)<\//, '><a href="'+url+
                            '" target="_blank" title="'+url+'" target="_blank">$1</a></');
                title.html(link);

                $(this).replaceWith('&rarr;');
            });
        },
        buttons: function () {
            $('#btn-music').on('mouseover', function (e) {
                $('#soundcloud').fadeIn();
            });
            $('#soundcloud').on('mouseout', function (e) {
                $('#soundcloud').fadeOut();
            });
            $('#btn-music, #btn-info').on('click', function (e) {
                return false;
            });
        },
        tooltips: function () {
            $('#btn-info').bt({
                positions: ['top', 'most'],
                padding: 5,
                width: 'auto',
                spikeLength: 10,
                fill: 'rgba(117, 113, 94, .5)',
                cssStyles: {color: '#f8f8f2', 'white-space': 'nowrap'},
                hoverIntentOpts: {
                    timeout: 1000
                },
                showTip: function(box){
                    $(box).fadeIn(500);
                },
                hideTip: function(box, callback){
                    $(box).animate({opacity: 0}, 500, callback);
                }
            });

            $('#content .syntaxhighlighter a').bt({
                positions: ['top', 'most'],
                padding: 5,
                width: 'auto',
                spikeLength: 5,
                fill: 'rgba(85, 85, 85)',
                strokeStyle: '#f8f8f2',
                cssStyles: {color: '#f8f8f2', 'white-space': 'nowrap'},
                hoverIntentOpts: {
                    timeout: 0
                },
                showTip: function(box){
                    $(box).fadeIn(200);
                },
                hideTip: function(box, callback){
                    $(box).animate({opacity: 0}, 200, callback);
                }
            });
        },
        spaces: function () {
            $('.line .spaces').each(function (index) {
                var text = $(this).text(),
                    count = text.match(/^(\s*)/g)[0].length;
                $(this).text('').parent().css({'padding-left': count*8});
            });
        }
    };
}(jQuery)), jQuery));
