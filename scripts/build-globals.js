import { writeJson } from "./utils.js";

import elevationTokens, {SAVE_PATH as elevationPath} from '../globals/shadow/index.js';
import colorTokens, {SAVE_PATH as colorPath} from '../globals/color/index.js';
import sizingTokens, {SAVE_PATH as sizingPath} from '../globals/sizing/index.js';
import {resolve} from 'path';

writeJson(elevationTokens, resolve(elevationPath));
writeJson(colorTokens, resolve(colorPath));
writeJson(sizingTokens, resolve(sizingPath));

