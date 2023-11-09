'use strict'

document.addEventListener('DOMContentLoaded',
	() => {
		document.querySelectorAll('.modal-open-link').forEach(elem => {
			let dataModalId = elem.getAttribute('data-modal-id');
			if(!dataModalId) return;

			let modalElem = document.querySelector(`.modal[data-modal-id="${dataModalId}"]`)
			if(!modalElem) return;
			let modalClose = modalElem.querySelector('.modal__close');
			if(modalClose) {
				modalClose.addEventListener('click', () => {
					modalElem.classList.remove('opened');
				});
			}
			elem.addEventListener('click', () => {
				modalElem.classList.add('opened');
			});
		})

		let brackets = document.querySelectorAll('.main-groups__item-bracket');
		let icon = '<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 59.48 59.48\"><g><g id=\"_2865354662784\"><g><g><path class=\"fil0 str0\" d=\"M0.68 0.68l0 58.13 58.13 0 0 -58.13 -58.13 0zm55.8 55.8l-53.48 0 0 -53.48 53.48 0 0 53.48z\"/></g></g><g><g><polygon class=\"fil0 str0\" points=\"31.74,8.81 31.74,11.14 46.7,11.14 28.53,29.3 30.17,30.95 48.34,12.78 48.34,27.74 50.66,27.74 50.66,8.81 \"/></g></g></g></g></svg>';
		//
		// function getIdData(id) {
		// 	for (const value of dataJson.data.help) {
		// 		if(String(value.dataId) === String(id)) {
		// 			return value.links
		// 		}
		// 	}
		// }

		function CreateTip(classname, id) {
			let tip = document.createElement('div');
			tip.classList.add(`main-group-list__tip`);

			classname && tip.classList.add(`${classname}`);
			// let helpData = getIdData(id && id)
			// console.log(id)
			tip.innerHTML = `<a ${id ? `id=${id}_read` : ''} href=\"#\" class=\"instruction\">Читать инструкцию${icon}</a><a ${id ? `id=${id}_video` : ''} href=\"#\" class=\"instruction video\">Смотреть видеоинструкцию${icon}</a>`;
			return tip
		}


		const firstLevel = document.querySelectorAll('.menu__first_level > li > a')

		const tip = new CreateTip('main-group-list__tip');
		const headingsTip = (id) => {
			return new CreateTip( 'main-btns__item-name__tip', id);
		}

		firstLevel.forEach((item) => {
			item.append(CreateTip(undefined, item.dataset.menuid));
			item.parentElement.querySelectorAll('.menu__second_level > li > a').forEach( (link, i) => {
				link.dataset.menuid = `${item.dataset.menuid}_${i+1}`
				link.parentElement.querySelectorAll('.menu__third_level > li > a').forEach( (lnk, i) => {
					lnk.dataset.menuid = `${link.dataset.menuid}_${i+1}`
				})
			})
		})

		const allQuickTips = document.querySelectorAll('.quicktip.menutip')
		allQuickTips.forEach((item) => {
			// console.log(item.parentElement.dataset.menuid)
			let submenutip = new CreateTip('submenu__tip', item.parentElement.dataset.menuid)
			item.addEventListener('click', () => {
				if(document.querySelector('.submenu__tip')) {
					document.querySelector('.submenu__tip').remove()
				}
				item.parentElement.parentElement.appendChild(submenutip);
			}, true);

			item.parentElement.parentElement.addEventListener('mouseenter', () => {
				if(!item.parentElement.parentElement.querySelector('.menu__third_level') && item.parentElement.parentElement.querySelector('.submenu__tip')) {
					item.parentElement.parentElement.querySelector(".submenu__tip").remove();

				}

			})
			item.parentElement.parentElement.addEventListener('mouseleave',
					(event) => {
						if(item.parentElement.parentElement.contains(event.target) && item.parentElement.parentElement.querySelector('.submenu__tip')) {
							item.parentElement.parentElement.querySelector(".submenu__tip").remove();
						}
						item.classList.remove('active');
				}, false);

		})
		let submenu = document.createElement('ul');
		submenu.classList.add('submenu');
		let linkArr = ['Создать номенклатуру (SKU)', 'Справочник номенклатуры', 'Загрузить номенклатуру из МП'];

		for (let i = 0; linkArr.length > i; i++) {
			let listItem = document.createElement('li');
			let qtip = document.createElement('span');
			qtip.classList.add('quicktip');
			qtip.addEventListener('click', () => {
				let submenutip = new CreateTip('submenu__tip');
				listItem.appendChild(submenutip);
				qtip.classList.add('active');
			}, false);

			listItem.addEventListener('mouseleave', () => {
				qtip.classList.remove('active');

			}, false);

			listItem.appendChild(qtip);
			listItem.addEventListener('mouseenter',
				() => {
					listItem.classList.add('active');

				}, false);
			listItem.addEventListener('mouseleave',
				() => {
					listItem.classList.remove('active');
					if(!qtip.contains(event.target) && listItem.querySelector('.submenu__tip')) {
						listItem.querySelector(".submenu__tip").remove();
					}
					qtip.classList.remove('active');
				}, false);


			let listItemLink = document.createElement('a');
			listItemLink.setAttribute('href', '#');
			listItemLink.innerText = linkArr[i];
			listItem.appendChild(listItemLink);
			submenu.appendChild(listItem);
		}
		//Активные разделы и скобки при наведении на Заголовоки
		let headings = document.querySelectorAll('.main-btns__item');
		let mainGroups = document.querySelectorAll('.main-groups__item');

		for (let i = 0; headings.length > i; i++) {
			headings[i].addEventListener('mouseenter',
				() => {

					mainGroups[i].classList.add('active');
					headings[i].firstElementChild.append(headingsTip(headings[i].firstElementChild.dataset.menuid));
				}, {
				once: false,
					capture: false
				});

			headings[i].addEventListener('mouseleave',
				() => {
					mainGroups[i].classList.remove('active');
					headings[i].firstElementChild.lastElementChild.classList.contains('main-btns__item-name__tip') ? headings[i].firstElementChild.lastElementChild.remove() : null
				}, false);

			mainGroups[i].addEventListener('mouseenter',
				() => {
					mainGroups[i].classList.add('active');
					headings[i].classList.add('hover')
				}, false);

			mainGroups[i].addEventListener('mouseleave',
				() => {
					mainGroups[i].classList.remove('active');
					headings[i].classList.remove('hover')
				}, false);
		}


		//Активные скобки при наведении на Скобки
		for (let i = 0; brackets.length > i; i++) {

			brackets[i].addEventListener('mouseenter', () => {

				headings[i].classList.add('hover');
				brackets[i].parentElement.classList.add('active');
			}, false);

			brackets[i].addEventListener('mouseleave',
				function () {

					headings[i].classList.remove('hover');
					brackets[i].parentElement.classList.remove('active')
				}, false);
		}
		//Всплывающие подсказки и Submenu
		for (let i = 0; mainGroups.length > i; i++) {
			let targetGroupList = mainGroups[i].querySelectorAll('.main-group-list')

			for (let i = 0; targetGroupList.length > i; i++) {

				targetGroupList[i].addEventListener('mouseenter', () => {
					let head = targetGroupList[i].querySelector('.main-group-list__title');
					targetGroupList[i].firstElementChild.firstElementChild.classList.contains('main-group-list__title') ? targetGroupList[i].firstElementChild.appendChild(tip) : null;
					targetGroupList[i].firstElementChild.firstElementChild.classList.contains('main-group-list__title') ? head.style.backgroundColor = '#ffe313' : null;

				}, true);

				////Выпадание меню при наведении на заголовок
				targetGroupList[i].addEventListener('mouseenter', () => {
					targetGroupList[i].parentElement.querySelectorAll('.main-group-list')[i].querySelector('.main-group-list__items').classList.toggle('opened')

				}, true);


				targetGroupList[i].addEventListener('mouseleave', () => {
					let head = targetGroupList[i].querySelector('.main-group-list__title');
					targetGroupList[i].firstElementChild.firstElementChild.classList.contains('main-group-list__title') ? head.style.backgroundColor = '' : null;
					targetGroupList[i].firstElementChild.firstElementChild.classList.contains('main-group-list__title') ? targetGroupList[i].firstElementChild.removeChild(tip) : null;
				}, false);

				let targetGroupItem = targetGroupList[i].querySelectorAll('.main-group-list__item')

				for (let i = 0; targetGroupItem.length > i; i++) {

					let mtip = document.createElement('span');
					mtip.classList.add('quicktip');
					mtip.classList.add('menutip');
					let submenutip = CreateTip('submenu__tip');

					mtip.addEventListener('click', () => {
						targetGroupItem[i].appendChild(submenutip);
						mtip.classList.add('active');
					}, false);

					targetGroupItem[i].appendChild(mtip);

					document.addEventListener('click', function (event) {
						if(!mtip.contains(event.target) && targetGroupItem[i].querySelector('.submenu__tip')) {
							targetGroupItem[i].querySelector(".submenu__tip").remove();
						}
						mtip.classList.remove('active');
					}, true);

					targetGroupItem[i].addEventListener('mouseleave', function (event) {
						if(!mtip.contains(event.target) && targetGroupItem[i].querySelector('.submenu__tip')) {
							targetGroupItem[i].querySelector(".submenu__tip").remove();
						}

						mtip.classList.remove('active');
					}, false);


					targetGroupItem[i].addEventListener('mouseover',
						() => {
							targetGroupItem[i].classList.add('menuActive')
							targetGroupItem[i].firstElementChild.after(submenu)

						}, false);

					targetGroupItem[i].addEventListener('mouseleave',
						() => {
							targetGroupItem[i].classList.remove('menuActive')
							let submenu = targetGroupItem[i].querySelector('.submenu')
							if(submenu.querySelector('.submenu__tip')) {
								submenu.querySelector(".submenu__tip").remove();
							}
							submenu ? submenu.remove() : null

						}, false)
				}
			}
		}

		//Checkboxes
		const checkBoxList = document.querySelector('.desktop-item')
		const menu = document.querySelector('.main-menu')
		const menuItems = menu.querySelectorAll('li');

		menuItems.forEach((i) => {
			i.addEventListener('click', () => {
				menuItems.forEach((it) => it.classList.remove('active'));
				i.classList.add('active');
			})
		})
		const checkboxitems = checkBoxList.querySelectorAll('input[id^="checkbox--"]')
		const blockcheckboxitems = checkBoxList.querySelector('input[id^="block_checkbox--"]')
		const block__fbs_order = document.querySelector('#fbs_order');

		blockcheckboxitems.addEventListener('change', function () {

			if(!blockcheckboxitems.checked) {
				block__fbs_order.style.display = 'none';
			} else {
				block__fbs_order.style.display = 'grid';
			}
		}, false);

		for (let i = 0; checkboxitems.length > i; i++) {
			checkboxitems[i].addEventListener('change', function () {
				if(!this.checked) {
					menuItems[i + 1].style.display = 'none';
				} else {

					menuItems[i + 1].style.display = 'flex';
				}
			}, false);
		}
	}
);
