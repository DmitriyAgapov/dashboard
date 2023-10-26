document.addEventListener('DOMContentLoaded',
	() => {

		const picker = new easepick.create({
			element: document.getElementById('datepickers'),
			css: [
				'https://cdn.jsdelivr.net/npm/@easepick/core@1.2.1/dist/index.css',
				'https://cdn.jsdelivr.net/npm/@easepick/range-plugin@1.2.1/dist/index.css',
				'https://cdn.jsdelivr.net/npm/@easepick/preset-plugin@1.2.1/dist/index.css',
			],
			zIndex: 1000,
			plugins: ['RangePlugin', 'PresetPlugin'],
			PresetPlugin: {
				position: 'left',
			},
			RangePlugin: {
				elementEnd: "#datepickere"
			}
		});
		picker();
	})
