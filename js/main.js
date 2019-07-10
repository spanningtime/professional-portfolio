$(document).ready(function() {
    //vars
    var $navItem = $('.nav-item');
    var $hr = $('.header-title+hr');
    var $navCurtain = $('.nav-curtain');
    var $activeNavItem = $('.active-nav-item');
    var $selfPhoto = $('.self-photo');
    var $contentContainer = $('.content-container');
    var $contentBlock = $('.content-block');
    var $defaultBg = '#c3d7ea';
    var aboutSlideCount = $('.about-carousel li').length;
    var currentAboutSlideNumber = 1;
    var portfolioSlideCount = $('.portfolio-carousel li').length;
    console.log(portfolioSlideCount)
    var currentPortfolioSlideNumber = 1;
    var selectedNav;

    function appendCarouselNumbers() {
        $('.about-carousel .owl-nav').append(
            `<span class="carousel-numbers">${currentAboutSlideNumber} of ${aboutSlideCount}</span>`
        );
        $('.portfolio-carousel .owl-nav').append(
            `<span class="carousel-numbers">${currentAboutSlideNumber} of ${portfolioSlideCount}</span>`
        );
    }

    function replaceCarouselArrows() {
        $('.owl-prev').find('span').html('<img src="assets/carousel-arrow-left.svg"/>');
        $('.owl-next').find('span').html('<img src="assets/carousel-arrow-right.svg"/>');
    }

    var buildAboutCarousel = function() {
        carousel = $('.about-carousel').addClass('owl-carousel');
        carousel.owlCarousel({
            loop: true,
            nav:true,
            items: 1,
            singleItem: true,
        })
        carousel.on('changed.owl.carousel', function(event) {
            var currentAboutSlideNumber = event.item.index - 2;
            if (currentAboutSlideNumber === 0) {
                currentAboutSlideNumber = aboutSlideCount;
            }
            if (currentAboutSlideNumber === aboutSlideCount + 1) {
                currentAboutSlideNumber = 1
            }
            $('.carousel-numbers').html(`${currentAboutSlideNumber} of ${aboutSlideCount}`)
        })
        appendCarouselNumbers();
        replaceCarouselArrows();
    };

    var destroyAboutCarousel = function() {
        carousel.trigger('destroy.owl.carousel');
        carousel = false;
        $('about-carousel').removeClass('owl-carousel');
    }

    var buildPortfolioCarousel = function() {
        carousel = $('.portfolio-carousel').addClass('owl-carousel');
        carousel.owlCarousel({
            loop: true,
            nav:true,
            items: 1,
            singleItem: true,
        })
        carousel.on('changed.owl.carousel', function(event) {
            var currentPortfolioSlideNumber = event.item.index - 1;
            if (currentPortfolioSlideNumber === 0) {
                currentPortfolioSlideNumber = portfolioSlideCount;
            }
            if (currentPortfolioSlideNumber === portfolioSlideCount + 1) {
                currentPortfolioSlideNumber = 1
            }
            $('.carousel-numbers').html(`${currentPortfolioSlideNumber} of ${portfolioSlideCount}`)
        })
        appendCarouselNumbers();
        replaceCarouselArrows();
    };

    var destroyPortfolioCarousel = function() {
        carousel.trigger('destroy.owl.carousel');
        carousel = false;
        $('portfolio-carousel').removeClass('owl-carousel');
    }

    function resetaboutSlideCount() {
        currentAboutSlideNumber = 1;
        $('.carousel-numbers').html('')
    }

    function resetPortfolioSlideCount() {
        currentPortfolioSlideNumber = 1;
        $('.carousel-numbers').html('')
    }

    function separateNavItemClass(array) {
        var classList = array.attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            if (item !== 'nav-item') {
                selectedNav = item;
            }
        });
    }

    $navItem.on('click', function(e) {
        separateNavItemClass($(this));
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
            if (selectedNav === 'about-me') {
                buildAboutCarousel();
                // handleCarouselArrows();
            }
            if (selectedNav === 'portfolio') {
                buildPortfolioCarousel();
                // handleCarouselArrows();
            }
         }, 500);

         setTimeout(function() {
            $activeNavItem.css('color', shapeBgColor).addClass('is-active');
            $contentContainer.css('background-color', shapeBgColor);
            $contentContainer.find(`[data-name='${selectedNav}']`).addClass('is-active')
            $selfPhoto.addClass('back').children().eq(0).attr('src', 'assets/left-arrow.svg');
         }, 600);
    })

    $selfPhoto.on('click', function() {
        $('owl-carousel.about-carousel').owlCarousel('destroy')
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
               if (selectedNav === 'about-me') {
                resetaboutSlideCount();
                destroyAboutCarousel();
               }
               if (selectedNav === 'portfolio') {
                resetPortfolioSlideCount();
                destroyPortfolioCarousel();
               }
            }, 500);
        }
    })

    $selfPhoto.on('mouseenter', function() {
        if (!$(this).hasClass('back')) {
            $selfPhoto.children().eq(0).attr('src', 'assets/me-drawn.jpg')
        }
    })
    $selfPhoto.on('mouseleave', function() {
        if (!$(this).hasClass('back')) {
            $selfPhoto.children().eq(0).attr('src', 'assets/me.png')
        }
    })

    $('.about-img').each(function() {
        $(this).on('click', function() {
            $(this).addClass('grow-img')
        })
    })
})