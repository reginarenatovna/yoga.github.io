function timer() {
	const deadline = '2018-12-27';

	function getTimeRemaining(endtime) {
		if (Date.parse(endtime) > Date.parse(new Date())) {
			let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)));
			if (hours < 10) {
				hours = [`0 ${ hours}`];
			}
			if (minutes < 10) {
				minutes = [`0 ${minutes} `];
			}
			if (seconds < 10) {
				seconds = [`0 ${seconds} `];
			}
			return {
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		} else {
			let t = 0;
			let seconds = 0,
				minutes = 0,
				n = 0,
				hours = 0;
			if (hours < 10) {
				hours = `${n} ${hours}`;
			}
			if (minutes < 10) {
				minutes = `${n} ${minutes}`;
			}
			if (seconds < 10) {
				seconds = `${n} ${seconds}`;
			}
			return {
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}
	}

	function setClock(id, endtime) {
		const timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');
		let timeInterval = setInterval(updateClock, 1000);

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
}

module.export = timer;