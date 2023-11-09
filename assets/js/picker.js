document.addEventListener('DOMContentLoaded',
	() => {

		const picker = new easepick.create({
			element: document.getElementById('datepickers'),
			css: [
				'assets/easepick/index.css',
				'assets/easepick/preset-plugin.css',
				'assets/easepick/range-plugin.css',
			],
			lang: 'ru-RU',
			zIndex: 1000,
			plugins: ['RangePlugin', 'PresetPlugin'],
			PresetPlugin: {
				customLabels: ['Сегодня', 'Вчера',
					'7 дней', '30 дней',
					'С начала месяца', 'Последний месяц'],
				position: 'left',
			},
			RangePlugin: {
				elementEnd: "#datepickere"
			}
		});
	})
