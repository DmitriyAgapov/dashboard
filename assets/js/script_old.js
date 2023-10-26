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

		function CreateTip(classname) {
			let tip = document.createElement('div');
			tip.classList.add(`main-group-list__tip`);
			tip.classList.add(`${classname}`);

			tip.innerHTML = `<a  href=\"#\" class=\"instruction\">Читать инструкцию${icon}</a><a href=\"#\" class=\"instruction video\">Смотреть видеоинструкцию${icon}</a>`;
			return tip
		}
		const firstLevel = document.querySelectorAll('.menu__first_level > li > a')

		const tip = new CreateTip('main-group-list__tip');
		const headingsTip = new CreateTip('main-btns__item-name__tip');
		for(const item of firstLevel) {

		}
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

		const checkboxitems = checkBoxList.querySelectorAll('input')
		for (let i = 0; checkboxitems.length > i; i++) {
			checkboxitems[i].addEventListener('change', function () {
				if(!this.checked) {
					menuItems[i + 1].style.display = 'none';
				} else {

					menuItems[i + 1].style.display = 'list-item';
				}
			}, false);
		}
	}
);
