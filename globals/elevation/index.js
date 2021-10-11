import elevationColorTokens from './canvas/canvas.js';
import elevationFilterTokens from './filter/filter.js';

export default {
    elevation: {
        ...elevationColorTokens,
        ...elevationFilterTokens
    }
}

export const SAVE_PATH = 'dist/elevation/elevation.json';
