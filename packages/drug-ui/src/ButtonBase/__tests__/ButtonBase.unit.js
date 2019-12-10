import * as renderer from 'react-test-renderer';
import React from 'react';
import { mount } from 'enzyme';
import ButtonBase from '../ButtonBase';

describe('<ButtonBase />', () => {

    it('render successful', () => {
        const json = renderer.create(<ButtonBase />).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('set props className', () => {
        const wrapper = mount((
            <ButtonBase className="button button2" />
        ));
        expect(wrapper.hasClass('button button2')).toBeTruthy();
    });

    it('set props href', () => {
        const wrapper = mount((
            <ButtonBase href="https://google.com" />
        ));
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('span set props href', () => {
        const wrapper = mount((
            <ButtonBase component="span" href="https://google.com" />
        ));
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('SPAN');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('set props component href to aLink', () => {
        const wrapper = mount((
            <ButtonBase href="https://google.com" />
        ));
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('set props component', () => {
        const Comp = ((props) => {
            const { children, ...rest } = props;
            return <a href="https://baidu.com" { ...rest }>{ children }</a>;
        });
        const wrapper = mount((
            <ButtonBase component={ Comp } />
        ));
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://baidu.com');
    });

    it('set props disabled', () => {
        const fn = jest.fn();
        const wrapper = mount((
            <ButtonBase disabled onClick={ fn } />
        ));
        const dom = wrapper.getDOMNode();
        expect(dom.getAttribute('disabled')).not.toBeNull();
        wrapper.simulate('click');
        expect(fn).not.toBeCalled();
        console.log(22);
    });

    it('set props ripple', () => {
        const wrapper = mount((
            <ButtonBase />
        ));
        const dom = wrapper.getDOMNode();
        expect(wrapper.find('span').exists()).toBeTruthy();
        wrapper.setProps({ disableRipple: true });
        expect(wrapper.find('span').exists()).toBeFalsy();
    });
});
