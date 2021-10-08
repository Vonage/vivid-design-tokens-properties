import elevationShadowTokens from '../../globals/shadow/elevation';
import elevationColorTokens from '../../globals/color/elevation';
import StyleDictionaryPackage from 'style-dictionary';
import {getStyleDictionaryConfig} from "../utils";

import elevationParser from '../../ci/parsers/elevation-data-parser.js';
import { rawData } from "./elevation-test-data.js";

describe(`Elevation Tokens`, function () {
    it(`should create the shadow tokens blueprint`, function () {
        expect(JSON.stringify(elevationShadowTokens, null, 2)).toMatchSnapshot();
    });

    it(`should create the color tokens blueprint`, function () {
        expect(JSON.stringify(elevationColorTokens, null, 2)).toMatchSnapshot();
    });

    describe(`Figma Parser`, function () {
        it(`should generate the correct elevations values json from Figma`, function () {
            function mockWriteJson(data, path) {
                results.push({
                    data, path
                });
            }

            const data = {
                document: {
                    children: [
                        {
                            name: '🟡 design.tokens.elevation',
                            type: "FRAME",
                            children: [
                                {
                                    name: 'light',
                                    type: 'FRAME',
                                    children: [
                                        {
                                            name: 'main',
                                            type: 'FRAME',
                                            children: [
                                                {
                                                    name: '30',
                                                    type: 'FRAME',
                                                    "backgroundColor": {
                                                        "r": 1.0,
                                                        "g": 1.0,
                                                        "b": 1.0,
                                                        "a": 1.0
                                                    },
                                                    "styles": {
                                                        "fills": "1:4",
                                                        "effect": "1:502"
                                                    },
                                                    "effects": [
                                                        {
                                                            "type": "DROP_SHADOW",
                                                            "visible": true,
                                                            "color": {
                                                                "r": 0.4,
                                                                "g": 0.8,
                                                                "b": 0.0,
                                                                "a": 0.10000000149011612
                                                            },
                                                            "blendMode": "NORMAL",
                                                            "offset": {
                                                                "x": 0.0,
                                                                "y": 1.0
                                                            },
                                                            "radius": 4.0,
                                                            "showShadowBehindNode": true
                                                        },
                                                        {
                                                            "type": "DROP_SHADOW",
                                                            "visible": true,
                                                            "color": {
                                                                "r": 0.0,
                                                                "g": 0.0,
                                                                "b": 0.0,
                                                                "a": 0.050000000745058060
                                                            },
                                                            "blendMode": "NORMAL",
                                                            "offset": {
                                                                "x": 0.0,
                                                                "y": 1.0
                                                            },
                                                            "radius": 2.0,
                                                            "showShadowBehindNode": true
                                                        },
                                                        {
                                                            "type": "DROP_SHADOW",
                                                            "visible": true,
                                                            "color": {
                                                                "r": 0.0,
                                                                "g": 0.0,
                                                                "b": 0.0,
                                                                "a": 0.050000000745058060
                                                            },
                                                            "blendMode": "NORMAL",
                                                            "offset": {
                                                                "x": 0.0,
                                                                "y": 2.0
                                                            },
                                                            "radius": 1.0,
                                                            "showShadowBehindNode": true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            };
            const expectedShadow = {
                shadow: {
                    elevation: {
                        "dp-2": {
                            filter: {
                                value: "drop-shadow(0 1px 4px rgba(102, 204, 0, 0.10000000149011612)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05000000074505806)) drop-shadow(0 2px 1px rgba(0, 0, 0, 0.05000000074505806))"
                            }
                        }
                    }
                }
            };

            const expectedColor = {
                color: {
                    elevation: {
                        "dp-2": {
                            canvas: {
                                value: "rgba(255, 255, 255, 1)"
                            }
                        }
                    }
                }
            };

            const expectedMerged = {
                alias: {
                    ...expectedShadow, ...expectedColor
                }
            };

            const results = [];
            elevationParser.parse(data, mockWriteJson);

            expect(expectedMerged).toEqual(results[0].data);
            expect(results.length).toEqual(1);
            expect(results[0].path).toEqual(`./elevations/light/main.json`)
        });
    });
});
