import { wait } from '@drug-ui/core/test-utils';
import { capitalize, isNumeric, isEmptyObject, throttle } from '../index';

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

    describe('isEmptyObject', () => {

        it('接受 null', () => {
            expect(isEmptyObject(null)).toBeFalsy();
        });

        it('接受 { a: 1 }', () => {
            expect(isEmptyObject({ a: 1 })).toBeFalsy();
        });

        it('接受 {}', () => {
            expect(isEmptyObject({})).toBeTruthy();
        });

        it('接受 Object.create(null)', () => {
            expect(isEmptyObject(Object.create(null))).toBeTruthy();
        });

        it('接受一个数字', () => {
            expect(isEmptyObject(100)).toBeFalsy();
        });

        it('接受一个字符串', () => {
            expect(isEmptyObject('100')).toBeFalsy();
        });

        it('接受一个日期对象', () => {
            expect(isEmptyObject(new Date())).toBeFalsy();
        });

        it('接受一个字符串对象', () => {
            expect(isEmptyObject(new String())).toBeFalsy();
        });
    });

    describe('throttle', () => {

        it('第一个参数必须为函数', () => {
            expect(() => throttle()).toThrowError(new Error('fn is not a function'));
        });

        it('可以正常运行', async () => {
            const spy = jest.fn();
            const fn = throttle(spy, 20);
            fn(1);
            fn(2);
            fn(3);
            fn(4);
            fn(5);
            expect(spy).toBeCalledWith(1);
            expect(spy).toBeCalledTimes(1);
            await wait(50);
            fn(6);
            fn(7);
            fn(8);
            fn(9);
            fn(10);
            expect(spy).toBeCalledWith(6);
            expect(spy).toBeCalledTimes(2);
        });
    });
});
