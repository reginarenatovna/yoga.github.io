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

let deadline = '2018-12-27';

function getTimeRemaining(endtime) {
	if (Date.parse(endtime) > Date.parse(new Date())) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			 	seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)));
		if (hours < 10) {
			hours = '0' + hours;
		} if (minutes < 10) {
			minutes = '0' + minutes;
		} if (seconds < 10) {
			seconds = '0' + seconds;
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
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
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
	let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');
	var timeInterval = setInterval(updateClock,1000);
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
});