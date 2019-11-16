import * as renderer from 'react-test-renderer';
import React from 'react';
import { mount } from 'enzyme';
import Icon from '../Index';

describe('Icon', () => {

    it('render successful', () => {
        const json = renderer.create(<Icon name="left" />).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以触发点击事件', () => {
        const fn = jest.fn();
        const icon = mount(<Icon name="left" onClick={ fn } />);
        icon.find('svg').simulate('click');
        expect(fn).toBeCalled()
    });
});
