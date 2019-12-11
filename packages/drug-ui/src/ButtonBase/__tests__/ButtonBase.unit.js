import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import ButtonBase from '..';

const mount = enzyme.mount;

describe('<ButtonBase />', () => {

    it('render successful', () => {
        const json = renderer.create(<ButtonBase />).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以设置 className', () => {
        const wrapper = mount(<ButtonBase className="button button2" />);
        expect(wrapper.hasClass('button button2')).toBeTruthy();
    });

    it('可以设置 href', () => {
        const wrapper = mount(<ButtonBase href="https://google.com" />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('为 span 设置 href', () => {
        const wrapper = mount(<ButtonBase component="span" href="https://google.com" />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('SPAN');
        expect(dom.getAttribute('href')).toBe('https://google.com');
    });

    it('可以传入组件', () => {
        const Comp = ((props) => {
            const { children, ...rest } = props;
            return <a href="https://baidu.com" { ...rest }>{ children }</a>;
        });
        const wrapper = mount(<ButtonBase component={ Comp } />);
        const dom = wrapper.getDOMNode();
        expect(dom.tagName).toBe('A');
        expect(dom.getAttribute('href')).toBe('https://baidu.com');
    });

    it('可以设置 disabled', () => {
        const fn = jest.fn();
        const wrapper = mount(<ButtonBase disabled onClick={ fn } />);
        const dom = wrapper.getDOMNode();
        expect(dom.getAttribute('disabled')).not.toBeNull();
        wrapper.simulate('click');
        expect(fn).not.toBeCalled();
    });

    it('可以设置 ripple', () => {
        const wrapper = mount(<ButtonBase />);
        expect(wrapper.find('span').exists()).toBeTruthy();
        wrapper.setProps({ disableRipple: true });
        expect(wrapper.find('span').exists()).toBeFalsy();
    });
});
