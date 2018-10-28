function calc() {
		let persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

		totalValue.textContent = 0;

		restDays.addEventListener('keypress', event => {
			if (!/\d/.test(event.key)) {
				event.preventDefault()
			}
		});
		persons.addEventListener('keypress', event => {
			if (!/\d/.test(event.key)) {
				event.preventDefault()
			}
		});

		persons.addEventListener('change', function () {
			personsSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if (restDays.value == '') {
				totalValue.textContent = 0;
			} else {
				let a = total;
				totalValue.textContent = a * place.options[place.selectedIndex].value;
			}
			if (persons.value == '') {
				totalValue.textContent = 0;
			}
		});

		restDays.addEventListener('change', function () {
			daysSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if (persons.value == '') {
				totalValue.textContent = 0;
			} else {
				let a = total;
				totalValue.textContent = a * place.options[place.selectedIndex].value;
			}
			if (restDays.value == '') {
				totalValue.textContent = 0;
			}
		});

		place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.textContent = 0;
		} else {
			let a = total;
			totalValue.textContent = a * this.options[this.selectedIndex].value;
		}
		});
}

module.export = calc;