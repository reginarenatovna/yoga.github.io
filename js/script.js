window.addEventListener('DOMContentLoaded', function(){

	'use strict';
	let tab = document.querySelectorAll('.info-header-tab'),
			info = document.querySelector('.info-header'),
			tabContant = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i=a; i < tabContant.length; i++) {
			tabContant[i].classList.remove('show');
			tabContant[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContant[b].classList.contains('hide')) {
			tabContant[b].classList.remove('hide');
			tabContant[b].classList.add('show');
		}
	}

info.addEventListener('click', function(event) {
	let target = event.target;
	if (target && target.classList.contains('info-header-tab')){
		for (let i=0; i < tab.length; i++) {
			if (target == tab[i]){
				hideTabContent(0);
				showTabContent(i);
				break;
			}
		}
	}
});

const deadline = '2018-12-27';

function getTimeRemaining(endtime) {
	if (Date.parse(endtime) > Date.parse(new Date())) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			 	seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)));
		if (hours < 10) {
			hours = `0 ${ hours}` ;
		} if (minutes < 10) {
			minutes = `0 ${minutes} `;
		} if (seconds < 10) {
			seconds = `0 ${seconds} `;
		}
		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	} else {
		let 	t = 0;
		let seconds = 0,
				minutes = 0,
				hours = 0;
		if (hours < 10) {
			hours = `0 ${hours}`;
		}
		if (minutes < 10) {
			minutes = `0 ${minutes} `;
		}
		if (seconds < 10) {
			seconds = `0 ${seconds} `;
		}
		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
}

function setClock(id,endtime){
	const timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');
	let timeInterval = setInterval(updateClock,1000);
function updateClock() {
	let t = getTimeRemaining(endtime);
	hours.textContent = t.hours;
	minutes.textContent = t.minutes;
	seconds.textContent = t.seconds;
	if (t.total <= 0) {
		clearInterval(timeInterval);
	}
}
}
setClock('timer', deadline);

const more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

more.addEventListener('click', function (){
	overlay.style.display = 'block';
	this.classList.add('more-splash');
	document.body.style.overflow = 'hidden';
});

	const descrBtn = document.querySelectorAll('.description-btn');
	for (let i = 0; i < descrBtn.length; i++) {
		descrBtn[i].addEventListener('click', function () {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	}


close.addEventListener('click', function(){
	overlay.style.display = 'none';
	more.classList.remove('more-splash');
	document.body.style.overflow = '';
});


//Form 
let message = {
	loading: "Загрузка...",
	success: 'Спасибо! Мы скоро с вами свяжемся!',
	failure: 'Что-то пошло не так'
};


	let form = document.querySelector('.main-form'),
			formContact = document.querySelector('.contact-form"'),
			inputContact = formContact.getElementsByTagName('input'),
			input = form.getElementsByTagName('input'),
			statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
	formContact.addEventListener('submit', function(){
		event.preventDefault();
		form.appendChild(statusMessage);
		let req = new XMLHttpRequest();
		req.open('POST', 'server.php');
		req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		let formDt = new FormData(form);

		let object = {};
		formDt.forEach(function (value, key) {
			object[key] = value;
		});
		let json = JSON.stringify(object);
		req.send(json);
		req.addEventListener('readystatechange', function () {
			if (req.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (req.readyState === 4 && req.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});
		for (let i = 0; i < inputContact.length; i++) {
			inputContact[i].value = '';
		}
	});
	form.addEventListener('submit' , function(event){
	event.preventDefault();
	form.appendChild(statusMessage);

	let request = new XMLHttpRequest();
	request.open('POST', 'server.php');
	request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

	let formData = new FormData(form);

		let obj = {};
		formData.forEach(function(value,key){
			obj[key] = value;
		});
		let json = JSON.stringify(obj);
		request.send(json);
	
	request.addEventListener('readystatechange', function(){
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200 ) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
	});
	for (let i=0; i < input.length; i++) {
		input[i].value = '';
	}
});
});