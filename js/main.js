$(document).ready(function() {
    var $navItem = $('.nav-item');
    var $hr = $('.header-title+hr');
    var $navCurtain = $('.nav-curtain');
    var $activeNavItem = $('.active-nav-item');
    var $selfPhoto = $('.self-photo');
    var $contentContainer = $('.content-container');
    var $contentBlock = $('.content-block');
    var $defaultBg = '#c3d7ea';

    $navItem.on('click', function(e) {
        var classList = $(this).attr('class').split(/\s+/);
        var selectedNav;
        $.each(classList, function(index, item) {
            if (item !== 'nav-item') {
                selectedNav = item;
            }
        });
        $activeNavItem.text('')
        var shapeBgColor = $(this).find('.svg-background').css('fill');
        $hr.addClass('slide-hr-left');
        $navCurtain.addClass('curtain-down');
        $activeNavItem.append($(this).find('.svg-text').html())
        setTimeout(function() {
            $activeNavItem.css('color', shapeBgColor).addClass('is-active');
            $contentContainer.css('background-color', shapeBgColor);
            $contentContainer.find(`[data-name='${selectedNav}']`).addClass('is-active')
            $selfPhoto.addClass('back').children().eq(0).attr('src', 'assets/left-arrow.svg');
         }, 500);
    })

    $selfPhoto.on('click', function() {
        if ($(this).hasClass('back')) {
            $selfPhoto.children().eq(0).attr('src', 'assets/me.png').css('border', '10px solid #f59236');
            $activeNavItem.removeClass('is-active').text('');
            $navCurtain.addClass('curtain-up');
            $selfPhoto.removeClass('back');
            setTimeout(function() {
                $hr.addClass('slide-hr-right');
             }, 250);
            setTimeout(function() {
               $contentBlock.removeClass('is-active');
               $hr.removeClass('slide-hr-right slide-hr-left');
               $navCurtain.removeClass('curtain-down curtain-up')
               $contentContainer.css('background-color', $defaultBg);
            }, 500);
        }
    })
})