$(function () {
    new Swiper('.reviews-slider', {
        slidesPerView: 4,
        spaceBetween: 20,

        navigation: {
            nextEl: '.reviews__arrow--next',
            prevEl: '.reviews__arrow--prev',
        },

        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 2,
            },
            769: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 4,
            },
        },
    });
});
