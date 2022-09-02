
export function formInit() {
	const forms = document.querySelectorAll('form');
	const popup = document.querySelector('#popup');

	forms.forEach(form => {
		bindPostData(form);
	});

	const messages = {
    loading: 'img/spinner.svg',
    succses: 'Данные отправлены',
    failed: 'Произошла ошибка, попробуйте позже',
  };

	const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      }, 
      body: data,
    });

    return await res.json();
  };

	function bindPostData(form) {
		form.addEventListener("submit", e => {
			e.preventDefault();
			
			let error = formValidate(form);
			// let totalErr = 0;

			// if (typeof errors === 'object') {
			// 	errors.reduce((total, item) => {
			// 		totalErr += total + item;
			// 	});	
			// } else {
			// 	totalErr = errors;
			// }

			// console.log(totalErr);

			if (error === 0) {
				form.insertAdjacentHTML("beforeend", `<img class="form-loading" src="${messages.loading}" alt="Loading">`);
				let formLoading = form.querySelector('.form-loading');
			
				const formData = new FormData(form);
				const json = JSON.stringify(Object.fromEntries(formData.entries()));

				postData('server.php', json)
        .then(data => {
					formLoading.remove();
					form.innerHTML(`<div class="form-message form__sucsess">${messages.succses}</div>`);
        }).catch(() => {
					formLoading.remove();
					form.insertAdjacentHTML("beforeend", `<div class="form-message form__failed">${messages.failed}</div>`);
        }).finally(() => {
					const timerId = setTimeout(() => {
						try {
							popup.classList.remove('popup-open');
						} catch(e) {
							console.error(e);
						}
						document.body.classList.remove('_lock');
						form.querySelector('.form-message').remove();
						form.reset();
					}, 3000);
        });

			}	
		});
	}

	//Задаем условия для валидации
	function getValidateTerms(input, errSelector, validFunc) {
		let error = 0;

		if (input.classList.contains(errSelector)) {
			if (validFunc(input)) {
				formAddError(input);
				error++;
				if (!input.nextElementSibling.classList.contains('error') || input.nextElementSibling === null) {
					input.insertAdjacentHTML("afterend", `
						<div class="error">${input.getAttribute('data-error')}</div>
					`);
				}
			} else if (input.nextElementSibling === null || input.nextElementSibling.classList.contains('error')) {
				try {
					input.parentElement.querySelector('.error').style.display = 'none';
				} catch(e) {
					console.log(e);
				}
			}
		} else {
			return;
		}
		return error;
	}


	//валидация
	function formValidate(form) {
		let formReq = form.querySelectorAll('[data-req]');
		let error = 0;

		formReq.forEach(input => {
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				error += getValidateTerms(input, '_email', emailTest); 
			}

			if (input.classList.contains('_phone')) {
				error += getValidateTerms(input, '_phone', isNumber); 
			}

		});

		return error;
	}

	// проверяем на правильность емейл
	function emailTest (input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	// проверяем на правильность етелефон
	function isNumber(n) {
		return !(!isNaN(parseFloat(n.value)) && isFinite(n.value));
	}

	//Показ ошибки
	function formAddError(input) {
		input.parentElement.classList.add('_error');
	}

	//Удаление ошибки
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
	}
}