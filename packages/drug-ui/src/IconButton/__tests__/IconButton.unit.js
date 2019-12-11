import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import IconButton from '..';
import { Wrapper } from '@drug-ui/core/test-utils';
import Fab from '@drug-ui/core/Fab';

const mount = enzyme.mount;

describe('<IconButton />', () => {

    it('render successful', () => {
        const json = renderer.create(<Wrapper><IconButton /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以设置 className', () => {
        const wrapper = mount(<Wrapper><IconButton className="Fab Fab2">Hello World</IconButton></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('Fab')).toBeTruthy();
        expect(classList.contains('Fab2')).toBeTruthy();
    });

    it('默认按钮', () => {
        const wrapper = mount(<Wrapper><IconButton><span>1</span></IconButton></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = inherit', () => {
        const wrapper = mount(<Wrapper><IconButton color="inherit" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-colorInherit')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = primary', () => {
        const wrapper = mount(<Wrapper><IconButton color="primary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-primary')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = secondary', () => {
        const wrapper = mount(<Wrapper><IconButton color="secondary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-secondary')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = xxx', () => {
        const wrapper = mount(<Wrapper><IconButton color="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-colorInherit')).toBeFalsy();
        expect(classList.contains('DuiIconButton-primary')).toBeFalsy();
        expect(classList.contains('DuiIconButton-secondary')).toBeFalsy();
        expect(classList.length).toBe(2);
    });

    it('设置 size = small', () => {
        const wrapper = mount(<Wrapper><IconButton size="small" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-sizeSmall')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 size = medium', () => {
        const wrapper = mount(<Wrapper><IconButton size="medium" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-sizeMedium')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 size = xxx', () => {
        const wrapper = mount(<Wrapper><IconButton size="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-sizeSmall')).toBeFalsy();
        expect(classList.contains('DuiIconButton-sizeMedium')).toBeFalsy();
        expect(classList.contains('DuiIconButton-sizeLarge')).toBeFalsy();
        expect(classList.length).toBe(2);
    });

    it('设置 disabled', () => {
        const wrapper = mount(<Wrapper><IconButton disabled /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiIconButton-root')).toBeTruthy();
        expect(classList.contains('DuiButtonBase-disabled')).toBeTruthy();
        expect(classList.contains('DuiIconButton-disabled')).toBeTruthy();
        expect(classList.length).toBe(4);
    });
});
