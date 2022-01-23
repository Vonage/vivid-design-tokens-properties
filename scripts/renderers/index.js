import { render as themesConstsRender } from './themes/themes-consts.js';
import { render as themesSassRender } from './themes/themes-sass.js';
// import { renderTypographySassMixin, renderTypographyTypes } from './builders/typography/index.js';

console.log('\n\x1b[32m=== Design tokens build started ====\x1b[0m');

themesConstsRender();
themesSassRender();
// renderTypographySassMixin();
// renderTypographyTypes();

console.log('\n\x1b[32m=== Design tokens build completed ====\n\x1b[0m');
