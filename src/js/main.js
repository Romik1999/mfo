$(function () {
    $('[data-scroll]').click(function () {
        let id = $(this).data('scroll')
        $('.page-navigation__link.active').removeClass('active')
        $(this).addClass('active')
        if (window.innerWidth  > 990){
            $('html, body').animate({scrollTop: $('#' + id).offset().top - 180}, 500);
        } else {
            $('html, body').animate({scrollTop: $('#' + id).offset().top - 130}, 500);
        }
        return false
    });

    $('.directions-item__front').click(function () {
        if (!$(this).hasClass('active')) {
            $(this)
                .addClass('active')
                .siblings('.directions-item__content')
                .addClass('directions-item__content--visible')
                .find('.directions-content__arrow')
                .removeClass('active');
        }
    })

    $('.directions-content__arrow').click(function () {
        if (!$(this).hasClass('active')) {
            $(this)
                .addClass('active')
                .closest('.directions-item__content')
                .removeClass('directions-item__content--visible')
                .siblings('.directions-item__front')
                .removeClass('active');
        }
    })

    $('.hero-slider__items').slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '.hero-slider__arrows .slider-arrow--prev',
        nextArrow: '.hero-slider__arrows .slider-arrow--next'
    });

    $('.people-slider__items').slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        prevArrow: '.people-slider .slider-arrow--prev',
        nextArrow: '.people-slider .slider-arrow--next',
        responsive: [
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
        ]
    });

    $('.gallery__items').slick({
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        infinite: false,
        prevArrow: '.gallery .slider-arrow--prev',
        nextArrow: '.gallery .slider-arrow--next',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });

    if (document.querySelector('.promo .cont')) {
        function calcWidth() {
            let windowWidth = window.innerWidth;
            let clientWidth = document.querySelector('.promo .cont').clientWidth;
            let offset = ((windowWidth - clientWidth) / 2);
            let visibleWidth = document.querySelector('.promo-image').clientWidth;
            let backgroundWidth = offset + visibleWidth;
            $('.promo-image img').width(backgroundWidth);
        }

        calcWidth()
        window.addEventListener('resize', () => {
            calcWidth()
        });
    }

    $('.page-desc__button').click(function () {
        if (!$(this).siblings('.page-desc__text').hasClass('active')) {
            $(this).siblings('.page-desc__text').addClass('active');
            $(this).text('Свернуть')
        } else {
            $(this).siblings('.page-desc__text').removeClass('active');
            $(this).text('Развернуть')
        }
    })

// Все что связано с работой аккордеонов
    $('.accordion-main__title').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).siblings('.accordion-main__levels').slideDown();
            $(this).addClass('active')
        } else {
            $(this).siblings('.accordion-main__levels').slideUp();
            $(this).removeClass('active')
        }
    })

    $('.accordion-level__title').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).siblings('.accordion-level__items').slideDown();
            $(this).addClass('active')
        } else {
            $(this).siblings('.accordion-level__items').slideUp();
            $(this).removeClass('active')
        }
    })

    $('.accordion-item__title').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).siblings('.accordion-item__subitems').slideDown();
            $(this).addClass('active')
        } else {
            $(this).siblings('.accordion-item__subitems').slideUp();
            $(this).removeClass('active')
        }
    })
});
