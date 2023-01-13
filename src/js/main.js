document.addEventListener('DOMContentLoaded', () => {
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
            991: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            },
        },
    });

    const rangeInput = document.querySelector(".range__input"),
        rangeTrack = document.querySelector(".range__fill"),
        resultInput = document.querySelector(".amount-show");

    resultInput.value = resultInput.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Р'

    const calc = () => {
        let val = +rangeInput.value,
            min = +rangeInput.getAttribute('min'),
            max = +rangeInput.getAttribute('max'),
            step = +rangeInput.getAttribute('step'),
            position = 100 / (max - step) * (val - step);

        rangeTrack.style.width = `${position}%`;
        resultInput.value = rangeInput.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Р';
    }

    rangeInput.addEventListener('input', function () {
        calc();
    });

    calc();

    function maskPhone(e) {
        const mask = /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/;
        var valSize = e.target.value.trim().replace(/\D/g, "").length;
        e = e || window.event;
        var key = e.keyCode || e.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\+/;
        if (!regex.test(key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
        } else {
            if (valSize !== 0 && key === "+") {
                e.returnValue = false;
                return;
            }
            if (valSize === 0) {
                if (key === "8" || key === "7") {
                    e.target.value = "+7";
                    e.returnValue = false;
                } else if (key === "9") {
                    e.target.value = "+7 (9";
                    e.returnValue = false;
                } else if (key !== "+") {
                    e.target.value = "+7 (9";
                } else if (key === "+" && e.target.value === "+") {
                    e.returnValue = false;
                }
            } else if (valSize === 1) {
                e.target.value = "+7 (9";
                if (key === "9") {
                    e.returnValue = false;
                }
            } else if (valSize === 4) {
                if (e.target.value.slice(-1) === ")") {
                    e.target.value = e.target.value.trim() + " ";
                } else if (e.target.value.slice(-1) === " ") {
                    return;
                } else e.target.value = e.target.value.trim() + ") ";
            } else if (valSize === 7 || valSize === 9) {
                if (e.target.value.slice(-1) === " ") {
                    return;
                } else e.target.value = e.target.value.trim() + " ";
            } else if (valSize === 11) {
                e.returnValue = false;
            }
        }
    }

    function onPastePhone(e) {
        e.preventDefault();
        const mask = /(7|8)(9\d{2})(\d{3})(\d{2})(\d{2})/;
        var phone = e.clipboardData.getData('text/plain').replace(/\D/g, "");
        if (!mask.test(phone)) {
            e.returnValue = false;
            return;
        }
        var matched = phone.match(mask);
        e.target.value = "+7 (" + matched[2] + ") " + matched[3] + " " + matched[4] + " " + matched[5];
        e.returnValue = false;
    }
})