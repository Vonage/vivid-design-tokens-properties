import colorTokens from '../../globals/color/index.js';

describe(`Color`, function () {
    it(`should create the color tokens`, function () {
        expect(colorTokens).toMatchSnapshot();
    });
});
