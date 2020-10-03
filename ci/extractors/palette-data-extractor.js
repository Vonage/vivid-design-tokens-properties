export default function extractPalette(data) {
	const result = {
		alias: {
			color: {
				palette: {}
			}
		}
	};

	const schemesMap = {};
	walkDFS(data, scheme => {
		if (!scheme.name || !/^scheme\s*\/.*light/i.test(scheme.name)) {
			return;
		}
		const schemeName = scheme.name.match(/\/\s*(?<schemeName>\w*)/).groups.schemeName?.toLowerCase();
		schemesMap[schemeName] = {};
		const colorsMap = {};

		const uiColors = scheme.children.find(c => c.name && c.name.toLowerCase().trim() === 'ui colors');
		uiColors.children.forEach(color => {
			if (color.name.trim().indexOf(' ') > 0) {
				//	TOOD: black and white
			} else {
				const colorName = color.name.trim().toLowerCase();
				colorsMap[colorName] = {};
				const gradesMap = {};

				color.children.forEach(grade => {
					const gradeName = grade.name.trim();
					let { r, g, b, a } = grade.children
						.find(c => c.type === 'RECTANGLE')
						.fills[0].color;
					r = Math.round(r * 255);
					g = Math.round(g * 255);
					b = Math.round(b * 255);

					gradesMap[gradeName] = { value: `rgba(${r}, ${g}, ${b}, ${a})` };
				});
				Object.keys(gradesMap).sort()
					.forEach(gradeName => colorsMap[colorName][gradeName] = gradesMap[gradeName]);
			}
		});
		//	taking the single scheme right now
		Object.keys(colorsMap).sort()
			.forEach(colorName => result.alias.color.palette[colorName] = colorsMap[colorName]);
	});

	return result;
}

function walkDFS(tree, f) {
	if (!tree || typeof tree !== 'object') {
		throw new Error(`non-null object expected, got ${tree}`);
	}
	if (!f || typeof f !== 'function') {
		throw new Error(`function expected, got ${f}`);
	}
	for (const childKey in tree) {
		if (tree[childKey] && typeof tree[childKey] === 'object') {
			f(tree[childKey]);
			walkDFS(tree[childKey], f);
		}
	}
}