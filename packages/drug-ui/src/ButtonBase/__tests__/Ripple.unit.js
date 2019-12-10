import * as renderer from 'react-test-renderer';
import React from 'react';
import { mount } from 'enzyme';
import Ripple from '../Ripple';

describe('<Ripple />', () => {

    it('render successful', () => {
        const json = renderer.create(<Ripple />).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('set props center', () => {
        const wrapper = mount(<Ripple />);
        expect(wrapper.props().center).toBeFalsy();
        wrapper.setProps({ center: true });
        expect(wrapper.props().center).toBeTruthy();
    });
});
