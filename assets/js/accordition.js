document.addEventListener('DOMContentLoaded',
	() => {

		function setAcc(target) {

			const rootEl = document.querySelector(target)
			const accordition = rootEl.querySelector('.accordition');
			const trigger = accordition.querySelector('.accordition__control');
			const mainGroups = rootEl.querySelector('.main-groups');
			const mainBtns = rootEl.querySelectorAll('.main-btns__item');
			let pin = rootEl.querySelector('.accordition__btns span');

			const handleWrapperAction = () => {

				accordition.parentElement.classList.toggle('closed');

				setTimeout(() => handleAction);

			}

			const handleAction = (event) => {
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
			}

			const eventHandler = (event) =>  {
				let closedState = rootEl.classList.contains('closed');

				if(event.target.classList.contains('pinned')) {

					event.target.classList.remove(`pinned`);
					trigger.addEventListener('click', handleWrapperAction, true);
				} else {
					event.target.classList.add(`pinned`);
					trigger.removeEventListener('click',  handleWrapperAction, true);
				}

			}


			trigger.addEventListener('click', handleWrapperAction, true);
			pin.addEventListener('click' ,eventHandler, true);
		}
		setAcc(".dashboard_1");
		setAcc(".dashboard_2");
		setAcc(".dashboard_3");
		setAcc(".dashboard_4");
	}

);
