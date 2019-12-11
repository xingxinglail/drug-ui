import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import SvgIcon from '..';
import { Wrapper } from '@drug-ui/core/test-utils';
import Fab from '@drug-ui/core/Fab';

const mount = enzyme.mount;

describe('<SvgIcon />', () => {

    it('render successful', () => {
        const json = renderer.create(<Wrapper><SvgIcon /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以设置 className', () => {
        const wrapper = mount(<Wrapper><SvgIcon className="Fab Fab2">Hello World</SvgIcon></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('Fab')).toBeTruthy();
        expect(classList.contains('Fab2')).toBeTruthy();
    });

    it('默认状态', () => {
        const wrapper = mount(<Wrapper><SvgIcon /></Wrapper>);
        const dom = wrapper.getDOMNode();
        const classList = dom.classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.length).toBe(1);
        expect(dom.getAttribute('viewBox')).toBe('0 0 1024 1024');
        expect(dom.getAttribute('color')).toBeNull();
    });

    it('设置 color = primary', () => {
        const wrapper = mount(<Wrapper><SvgIcon color="primary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-colorPrimary')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = secondary', () => {
        const wrapper = mount(<Wrapper><SvgIcon color="secondary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-colorSecondary')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = disabled', () => {
        const wrapper = mount(<Wrapper><SvgIcon color="disabled" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-colorDisabled')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = xxx', () => {
        const wrapper = mount(<Wrapper><SvgIcon color="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-colorPrimary')).toBeFalsy();
        expect(classList.contains('DuiSvgIcon-colorSecondary')).toBeFalsy();
        expect(classList.contains('DuiSvgIcon-colorDisabled')).toBeFalsy();
        expect(classList.length).toBe(1);
    });

    it('设置 fontSize = inherit', () => {
        const wrapper = mount(<Wrapper><SvgIcon fontSize="inherit" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-fontSizeInherit')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 fontSize = small', () => {
        const wrapper = mount(<Wrapper><SvgIcon fontSize="small" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-fontSizeSmall')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 fontSize = large', () => {
        const wrapper = mount(<Wrapper><SvgIcon fontSize="large" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.contains('DuiSvgIcon-fontSizeLarge')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 fontSize = xxx', () => {
        const wrapper = mount(<Wrapper><SvgIcon fontSize="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiSvgIcon-root')).toBeTruthy();
        expect(classList.length).toBe(1);
    });

    it('设置 viewBox = 0 0 1208 1208', () => {
        const wrapper = mount(<Wrapper><SvgIcon viewBox="0 0 1208 1208" /></Wrapper>);
        const dom = wrapper.getDOMNode();
        expect(dom.getAttribute('viewBox')).toBe('0 0 1208 1208');
    });

    it('设置 htmlColor = blue', () => {
        const wrapper = mount(<Wrapper><SvgIcon htmlColor="blue" /></Wrapper>);
        const dom = wrapper.getDOMNode();
        expect(dom.getAttribute('color')).toBe('blue');
    });

    it('设置 titleAccess = svg', () => {
        const wrapper = mount(<Wrapper><SvgIcon titleAccess="svg" /></Wrapper>);
        const dom = wrapper.getDOMNode();
        const titleDom = dom.children[0];
        expect(titleDom.tagName).toBe('title');
        expect(titleDom.innerHTML).toBe('svg');
    });
});
