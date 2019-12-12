import { capitalize, isNumeric } from '../index';

describe('util', () => {

    describe('capitalize', () => {

        it('接受一个字符串', () => {
            expect(capitalize('hello world')).toBe('Hello world');
            expect(capitalize('Hello world')).toBe('Hello world');
        });

        it('接受非字符串', () => {
            expect(capitalize(0)).toBe(0);
            expect(capitalize(true)).toBe(true);
        });
    });

    describe('isNumeric', () => {

        it('接受一个数字', () => {
            expect(isNumeric(0)).toBeTruthy();
        });

        it('接受一个字符串数字', () => {
            expect(isNumeric('120')).toBeTruthy();
        });

        it('接受一个非数字字符串', () => {
            expect(isNumeric('asd')).toBeFalsy();
            expect(isNumeric('120px')).toBeFalsy();
        });

        it('接受 Infinity', () => {
            expect(isNumeric(Infinity)).toBeFalsy();
        });

        it('接受 NaN', () => {
            expect(isNumeric(NaN)).toBeFalsy();
        });

        it('接受负数', () => {
            expect(isNumeric(-99999)).toBeTruthy();
        });
    });
});
