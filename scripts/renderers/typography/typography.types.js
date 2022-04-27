import { resolve } from 'path';

import StyleDictionaryPackage from 'style-dictionary';
import fs from 'fs';
import _ from 'lodash';

const propertiesPath = resolve('./');


StyleDictionaryPackage.registerFormat({
	name: 'custom/format/enums',
	formatter: _.template(
		fs.readFileSync(resolve('templates/ts-enum.template'))
	),
});

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig() {
	return {
		source: [
			`${propertiesPath}/globals/typography/*.json`,
			`${propertiesPath}/typography/web.json`,
		],
		platforms: {
			ts: {
				transformGroup: 'js',
				buildPath: `${resolve()}/`,
				files: [
					{
						destination: 'dist/types/typography/font-faces.ts',
						format: 'custom/format/enums',
						mapName: 'VVDFontFace',
						filter: {
							attributes: {
								category: 'typography'
							}
						},
					}
				]
			}
		}
	};
}

export const render = () => {
	console.log('\n🔁\x1b[2mProcessing typography types\x1b[0m');

	StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('ts');

	console.log('\n\x1b[2m================================================================\x1b[0m');
};
