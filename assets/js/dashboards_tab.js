document.addEventListener('DOMContentLoaded',
	() => {
			let dashboardsLinks = document.querySelectorAll('.main-menu li');
			let dashboardTabs = document.querySelectorAll('main > div')

			function addClickTab(item) {
				item.addEventListener('click', function (e) {
					let relatedId = e.target.parentElement.id
					let relatedTab = document.querySelector(`#tab_${relatedId}`);
					for (const tab of dashboardTabs) {
						tab.style.display = 'none';
					}
					relatedTab.style.display = 'block';

				})

			}
			for(const item of dashboardsLinks) {
				addClickTab(item)
			}
	}
)