import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Button from '..';
import { Wrapper } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Button />', () => {

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Button /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以设置 className', () => {
        const wrapper = mount(<Wrapper><Button className="button button2">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('button')).toBeTruthy();
        expect(classList.contains('button2')).toBeTruthy();
    });

    it('默认按钮', () => {
        const wrapper = mount(<Wrapper><Button><span>1</span></Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 variant = contained', () => {
        const wrapper = mount(<Wrapper><Button variant="contained" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-contained')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 variant = outlined', () => {
        const wrapper = mount(<Wrapper><Button variant="outlined" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-outlined')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 variant = xxx', () => {
        const wrapper = mount(<Wrapper><Button variant="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeFalsy();
        expect(classList.contains('DuiButton-contained')).toBeFalsy();
        expect(classList.contains('DuiButton-outlined')).toBeFalsy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = inherit', () => {
        const wrapper = mount(<Wrapper><Button color="inherit" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-colorInherit')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 color = primary', () => {
        const wrapper = mount(<Wrapper><Button color="primary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-textPrimary')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 color = secondary', () => {
        const wrapper = mount(<Wrapper><Button color="secondary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-textSecondary')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 color = xxx', () => {
        const wrapper = mount(<Wrapper><Button color="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        console.log(classList);
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-colorInherit')).toBeFalsy();
        expect(classList.contains('DuiButton-textPrimary')).toBeFalsy();
        expect(classList.contains('DuiButton-textSecondary')).toBeFalsy();
        expect(classList.length).toBe(3);
    });

    it('设置 size = small', () => {
        const wrapper = mount(<Wrapper><Button size="small" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-textSizeSmall')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 size = large', () => {
        const wrapper = mount(<Wrapper><Button size="large" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-textSizeLarge')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 size = xxx', () => {
        const wrapper = mount(<Wrapper><Button size="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-textSizeSmall')).toBeFalsy();
        expect(classList.contains('DuiButton-textSizeLarge')).toBeFalsy();
        expect(classList.length).toBe(3);
    });

    it('设置 fullWidth', () => {
        const wrapper = mount(<Wrapper><Button fullWidth /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-fullWidth')).toBeTruthy();
        expect(classList.length).toBe(4);
    });

    it('设置 round', () => {
        const wrapper = mount(<Wrapper><Button round /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButton-round')).toBeTruthy();
        expect(classList.length).toBe(4);
    });
});
