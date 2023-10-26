document.addEventListener('DOMContentLoaded',
	() => {

		const accordition = document.querySelector('.accordition');
		const trigger = accordition.querySelector('.accordition__control');
		const mainGroups = document.querySelector('.main-groups');
		const mainBtns = document.querySelectorAll('.main-btns__item');

		trigger.addEventListener('click', function(event) {
			accordition.parentElement.classList.toggle('closed');

			setTimeout(() => {
				if(accordition.parentElement.classList.contains('closed')) {
					for(const item of mainGroups.children) {
						item.classList.remove('closed');
					}
					for (let i = 0; mainBtns.length > i; i++) {
						mainBtns[i].addEventListener('click', function () {
							if(accordition.parentElement.classList.contains('closed')) {
								for (const item of mainGroups.children) {
									item.classList.add('closed');
								}
								mainGroups.children[i].classList.remove('closed')
							}

						}, true);
					}
				} else {
					for(const item of mainGroups.children) {
						item.classList.add('closed');
						for (let i = 0; mainBtns.length > i; i++) {
							mainBtns[i].removeEventListener('click', () => null, false);
						}
					}
				}
				for(const child of mainGroups.children) {
					child.classList.toggle('closed');
				}
			});

		}, true);

	}
);