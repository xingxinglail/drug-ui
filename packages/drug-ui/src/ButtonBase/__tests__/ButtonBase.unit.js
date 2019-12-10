import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import ButtonBase from '..';
import Button from '../../Button';
import { Wrapper } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<ButtonBase />', () => {

    it('render successful', () => {
        const json = renderer.create(<ButtonBase />).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('set props className', () => {
        const wrapper = mount(<ButtonBase className="button button2" />);
        expect(wrapper.hasClass('button button2')).toBeTruthy();
    });

    it('set props href', () => {
        const wrapper = mount(<ButtonBase href="https://google.com" />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('span set props href', () => {
        const wrapper = mount(<ButtonBase component="span" href="https://google.com" />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('SPAN');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('set props component href to aLink', () => {
        const wrapper = mount(<ButtonBase href="https://google.com" />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('set props component', () => {
        const Comp = ((props) => {
            const { children, ...rest } = props;
            return <a href="https://baidu.com" { ...rest }>{ children }</a>;
        });
        const wrapper = mount(<ButtonBase component={ Comp } />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://baidu.com');
    });

    it('set props disabled', () => {
        const fn = jest.fn();
        const wrapper = mount(<ButtonBase disabled onClick={ fn } />);
        const dom = wrapper.getDOMNode();
        expect(dom.getAttribute('disabled')).not.toBeNull();
        wrapper.simulate('click');
        expect(fn).not.toBeCalled();
    });

    it('set props ripple', () => {
        const wrapper = mount(<ButtonBase />);
        expect(wrapper.find('span').exists()).toBeTruthy();
        wrapper.setProps({ disableRipple: true });
        expect(wrapper.find('span').exists()).toBeFalsy();
    });

    // todo events
    it('events', () => {
        const wrapper = mount((
            <Wrapper>
                <Button>Click Me</Button>
            </Wrapper>
        ))
        wrapper.find('.DuiRipple-root').simulate('mousedown');
    });
});
