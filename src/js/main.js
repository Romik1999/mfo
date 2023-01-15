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


    // range
    const sumInput = document.querySelector('.form__input--range'),
        rangeInputSum = document.querySelector('.range__input'),
        rangeTrackSum = document.querySelector('.range__fill'),
        rangeTrackHandler = document.querySelector('.range__handler');

    sumInput.value = sumInput.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Р'

    // маска
    function prettify(num) {
        const n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ') + ' Р';
    }

    function range(input$, progress$, content) {
        if (input$) {
            const val = input$.value;
            const min = input$.getAttribute('min');
            const max = input$.getAttribute('max');
            const step = input$.getAttribute('step');
            const position = 100 / (max - step) * (val - step);
            updateRangePosition(progress$, position);

            input$.addEventListener('input', () => {
                const val = input$.value;
                const min = input$.getAttribute('min');
                const max = input$.getAttribute('max');
                const step = input$.getAttribute('step');
                const position = 100 / (max - step) * (val - step);
                updateRangePosition(progress$, position);
                content.value = prettify(val);
            });
        }
    }

    function updateRangePosition(progress$, position) {
        if (progress$) {
            progress$.style.width = `${position}%`;
        }
    }

    range(rangeInputSum, rangeTrackSum, sumInput);


    sumInput.addEventListener('input', function () {

        const minSum = rangeInputSum.getAttribute('min');
        const maxSum = rangeInputSum.getAttribute('max');
        const stepSum = rangeInputSum.getAttribute('step');

        this.value = prettify(this.value.replace(/\D/g, ''))
        if (+this.value.replace(/\D/g, '') > +maxSum) {
            this.value = prettify(maxSum)
            return
        }
        if (+this.value.replace(/\D/g, '') < +minSum) {
            rangeInputSum.value = 0
            rangeTrackSum.style.width = 0 + '%'
            return
        }
        if (+this.value.replace(/\D/g, '') >= +minSum && +this.value.replace(/\D/g, '') <= +maxSum) {
            rangeTrackSum.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
            rangeInputSum.value = this.value.replace(/\D/g, '')
        }
    })

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