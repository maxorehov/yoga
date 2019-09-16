window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    
    //TABS

    let infoHeader = document.querySelector('.info-header'),
        headerTab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    function showContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    hideContent(1);

    infoHeader.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < headerTab.length; i++) {
                if (target == headerTab[i]) {
                    hideContent(0);
                    showContent(i);
                }
            }
        }

    });

    //TIMER
    
    let deadline = '2019-08-23';
    
    function getTimeRemaining(finish) {
        let t = Date.parse(finish) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60));
        return {
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours
        }
    }

    function setTimer(id, endtime) {
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(deadline);
            if (t.hours < 10) {
                hours.textContent = "0" + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.seconds < 10) {
                seconds.textContent = "0" + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }

            if (t.minutes < 10) {
                minutes.textContent = "0" + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setTimer('timer', deadline);

    //MODAL

    let more = document.querySelector('.more'),
        close = document.querySelector('.popup-close'),
        modal = document.querySelector('.overlay'),
        btnWrap = document.querySelectorAll('.btn-wrap');

        for (let i = 0; i < btnWrap.length; i++) {
            btnWrap[i].addEventListener('click', function() {
                modal.style.display = 'block';   
                this.classList.add('more-splash');
                document.body.style.overflow = 'hidden';
            })
        }
        close.addEventListener('click', function() {
            modal.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        //FORM

    let message = {
        loading: 'Lading...',
        success: 'Thank you!!!',
        failure: 'Oops!!!'
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByTagName('input'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let contactFormData = new FormData(contactForm);
        request.send(contactFormData);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < contactInput.length; i++) {
            contactInput[i].value = '';
            }
        });  

    //SLIDER

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlides(n) {
        showSlides(slideIndex = n);
    }

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlides(i);
            }
        }
    });

    showSlides(slideIndex);

    prev.addEventListener('click', () => plusSlides(-1));
    next.addEventListener('click', () => plusSlides(1));

    //CALCULATOR

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = '0';


    persons.addEventListener('change', function() {
        personsSum =+ this.value;
        
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum)*4000;
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum =+ this.value;
        
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum)*4000;
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            total.value = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });





});