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
			formContact = document.getElementById('form'),
			input = document.getElementsByTagName('input'),
			statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
	function sendForm(elem) {
		elem.addEventListener('submit', function (e) {
			e.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);
			function postData (data) {
				return new Promise(function(resolve, reject){
				let request = new XMLHttpRequest();
				request.open('POST', 'server.php');
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						resolve()
					} else if (request.readyState === 4) {
						if (request.status === 200 && request.status < 300) {
								resolve()
						}
						else {
							reject()
						}
					}
				}
					request.send(data);
				})
			} // end postData
			function clearInput() {
				for (let i = 0; i< input.length; i++) {
					input[i].value = '';
				}
			}
			postData(formData)
			.then(() => statusMessage.innerHTML = message.loading)
			.then(() => statusMessage.innerHTML = message.success)
			.catch(() => statusMessage.innerHTML = message.failure)
			.then(clearInput)
		});
		sendForm(form);
		sendForm(formContact);
	}
function	validate() {
	const inputPhone = document.querySelector('.popup-form__input');
	console.log(inputPhone);
	inputPhone.setAttribute('maxLenght',12);
	phone(inputPhone)
}
	validate()
function phone(inp) {
	inp.addEventListener('input', () => {
		if (!/^\+\d*$/.test(inp.value)) {
			inp.value = '+';
		}
	});
	inp.addEventListener('keypress', event => {
		if (!/\d/.test(event.key)) {
			event.preventDefault()
		}
	});
}
});
