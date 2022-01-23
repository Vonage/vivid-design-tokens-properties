import { render as themesConsts } from './themes/themes.consts.js';
import { render as themesSass } from './themes/themes.sass.js';
import { render as typographySassMixin } from './typography/typography.sass-mixins.js';
import { render as typographyTypes } from './typography/typography.types.js';


console.log('\n\x1b[32m=== Design tokens build started ====\x1b[0m');

themesConsts();
themesSass();
typographySassMixin();
typographyTypes();

console.log('\n\x1b[32m=== Design tokens build completed ====\n\x1b[0m');
