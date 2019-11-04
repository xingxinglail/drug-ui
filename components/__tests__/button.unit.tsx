import * as renderer from 'react-test-renderer';
import * as React from 'react';
import Button from '../button';

describe('button', () => {
    it('是个 div', () => {
        const json = renderer.create(<Button/>).toJSON();
        expect(json).toMatchSnapshot();
    });
});
