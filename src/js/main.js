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
    function digits_int(target){
        let val1 = $(target).val().replace(/[^0-9]/g, '');
        let val =val1.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        $(target).val(val);
    }

    digits_int('.amount-show');

    var $element = $('input[type="range"]');
    $element
        .rangeslider({
            polyfill: false,
            onInit: function () {
                $('.amount-show').val(this.value.toLocaleString('ru') + ' Р');
            }
        })
        .on('input', function (e) {
            let rangeVAl = this.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            $('.amount-show').val(rangeVAl + ' Р')
        });


    $('.popup__close').click(function () {
        $('.carousel__button.is-close').click();
    });
});