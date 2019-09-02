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
            loading: 'Загрузка',
            success: 'Спасибо! Мы скоро с вами свяжемся!',
            failure: 'Что-то пошло не так'
        };

        let form = document.querySelector('.main-form'),
            input = form.getElementsByTagName('input'),
            statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);
            //request
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencodes');
            
            let formData = new FormData(form);
            request.send(formData);
            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status ==200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });
            for(let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

        



     
        
});