import colorCanvasDp from './color-surface-dp.js';
import {join} from 'path';
import * as fs from 'fs';
import { dirName } from './__dirname.cjs';

const colorJSON = JSON.parse(fs.readFileSync(join(dirName, './color.json')).toString());

const category = "color";
const colors = {
    [category]: {
        ...colorCanvasDp,
        ...colorJSON.color,
    }
};
export default colors;

export const SAVE_PATH = 'tokens/color/color.json';

