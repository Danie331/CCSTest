



/// <reference path="..\Scripts/jasmine/jasmine.js" />
/// <reference path="..\Scripts/StringCalculator.js" />
describe('String Calculator', function () {
    it("should return zero when an empty string is passed", function () {
        expect(add('')).toEqual(0);
    });
});