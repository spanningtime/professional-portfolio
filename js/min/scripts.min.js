$(document).ready(function() {
    var $navItem = $('.nav-item');
    var $hr = $('.header-title+hr');
    var $navCurtain = $('.nav-curtain');
    var $activeNavItem = $('.active-nav-item');
    var $selfPhoto = $('.self-photo');

    $navItem.on('click', function() {
        $activeNavItem.text('')
        var shapeBgColor = $(this).find('.svg-background').css('fill');
        $hr.addClass('slide-hr-left');
        $navCurtain.addClass('curtain-down');
        $activeNavItem.append($(this).find('.svg-text').html())
        setTimeout(function() {
            $activeNavItem.css('color', shapeBgColor).addClass('is-active');
            $selfPhoto.addClass('back').children().eq(0).attr('src', 'assets/left-arrow.svg');
         }, 1000);
    })

    $selfPhoto.on('click', function() {
        if ($(this).hasClass('back')) {
            $selfPhoto.children().eq(0).attr('src', 'assets/temp-me.jpg').css('border', '10px solid #f59236');
            $activeNavItem.removeClass('is-active').text('');
            $navCurtain.addClass('curtain-up');
            $selfPhoto.removeClass('back');
            setTimeout(function() {
                $hr.addClass('slide-hr-right');
             }, 500);
            setTimeout(function() {
               $hr.removeClass('slide-hr-right slide-hr-left');
               $navCurtain.removeClass('curtain-down curtain-up')
            }, 1500);
        }
        else {
            $(this).children().eq(0).css('border', '0')
        }
    })
})