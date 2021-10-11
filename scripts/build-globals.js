import { writeJson } from "./utils.js";

import elevationTokens, {SAVE_PATH as elevationPath} from '../globals/elevation/index.js';
import {resolve} from "path";

writeJson(elevationTokens, resolve(elevationPath));
