import fs from 'fs';
import { RAW_DATA_PATH } from './commons.js';

//	main flow start
//
console.info('parsing data...');
const data = loadData();
dumpGlobalColors(data);
dumpTypography(data);

//	private functions
//
function loadData() {
	const data = fs.readFileSync(RAW_DATA_PATH, { encoding: 'utf-8' });
	if (!data) {
		throw ('no raw data found');
	} else {
		const result = JSON.parse(data);
		return result;
	}
}

function dumpGlobalColors(data) {
	const result = {
		alias: {
			color: {
				palette: {}
			}
		}
	};
	walkDFS(data, scheme => {
		if (!scheme.name || !/^scheme\s*\/.+/i.test(scheme.name)) {
			return;
		}
		const schemeName = scheme.name.match(/\/\s*(?<schemeName>\w*)/).groups.schemeName?.toLowerCase();
		const tmp = result.alias.color.palette[schemeName] = {};

		const uiColors = scheme.children.find(c => c.name && c.name.toLowerCase().trim() === 'ui colors');
		uiColors.children.forEach(color => {
			if (color.name.trim().indexOf(' ') > 0) {
				//	TOOD: black and white
			} else {
				const colorName = color.name.trim().toLowerCase();
				const tmpC = tmp[colorName] = {};

				color.children.forEach(grade => {
					const gradeName = grade.name.trim();
					let { r, g, b, a } = grade.children
						.find(c => c.type === 'RECTANGLE')
						.fills[0].color;
					r = Math.round(r * 255);
					g = Math.round(g * 255);
					b = Math.round(b * 255);

					tmpC[gradeName] = { value: `rgba(${r}, ${g}, ${b}, ${a})` };
				});
			}
		});
	});

	const output = JSON.stringify(result);
	fs.writeFileSync('./globals/color/palette.gen.json', output, { encoding: 'utf-8' });
}

function dumpTypography(data) {
	//	TODO
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