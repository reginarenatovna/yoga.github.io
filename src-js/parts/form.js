function form() {
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

			function postData(data) {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					request.onreadystatechange = function () {
						if (request.readyState < 4) {
							resolve()
						} else if (request.readyState === 4) {
							if (request.status === 200 && request.status < 300) {
								resolve()
							} else {
								reject()
							}
						}
					}
					request.send(data);
				})
			} // end postData
			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}
			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)
		});
	}
	sendForm(form);
	sendForm(formContact);

	function validate() {
		const inputPhone = document.querySelector('.popup-form__input'),
			inputContact = document.querySelectorAll('#form input')[1];
		console.log(inputPhone);
		inputPhone.setAttribute('maxLenght', 12);
		inputContact.setAttribute('maxLenght', 12);
		phone(inputPhone);
		phone(inputContact);
	}
	validate();

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
}

module.exports = form;