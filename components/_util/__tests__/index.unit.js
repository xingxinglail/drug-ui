import { classes } from '../index';

describe('util', () => {

    describe('classes', () => {

        it('接收一个字符串', () => {
            const result = classes('drug-ui');
            expect(result).toBe('drug-ui');
        });

        it('接收 undefined', () => {
            const result = classes('drug-ui', undefined);
            expect(result).toBe('drug-ui');
        });

        it('接收各种奇怪参数', () => {
            const result = classes('drug-ui', undefined, null, true, 3);
            expect(result).toBe('drug-ui true 3');
        });

        it('不传参数', () => {
            const result = classes();
            expect(result).toBe('');
        });
    });
});
