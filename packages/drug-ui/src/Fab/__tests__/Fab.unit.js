import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Fab from '..';
import { Wrapper } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Fab />', () => {

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Fab /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('可以设置 className', () => {
        const wrapper = mount(<Wrapper><Fab className="Fab Fab2">Hello World</Fab></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('Fab')).toBeTruthy();
        expect(classList.contains('Fab2')).toBeTruthy();
    });

    it('默认按钮', () => {
        const wrapper = mount(<Wrapper><Fab><span>1</span></Fab></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.length).toBe(2);
    });

    it('设置 color = inherit', () => {
        const wrapper = mount(<Wrapper><Fab color="inherit" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-colorInherit')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = primary', () => {
        const wrapper = mount(<Wrapper><Fab color="primary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-primary')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = secondary', () => {
        const wrapper = mount(<Wrapper><Fab color="secondary" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-secondary')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 color = xxx', () => {
        const wrapper = mount(<Wrapper><Fab color="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-colorInherit')).toBeFalsy();
        expect(classList.contains('DuiFab-primary')).toBeFalsy();
        expect(classList.contains('DuiFab-secondary')).toBeFalsy();
        expect(classList.length).toBe(2);
    });

    it('设置 size = small', () => {
        const wrapper = mount(<Wrapper><Fab size="small" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-sizeSmall')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 size = medium', () => {
        const wrapper = mount(<Wrapper><Fab size="medium" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-sizeMedium')).toBeTruthy();
        expect(classList.length).toBe(3);
    });

    it('设置 size = xxx', () => {
        const wrapper = mount(<Wrapper><Fab size="xxx" /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiFab-root')).toBeTruthy();
        expect(classList.contains('DuiFab-sizeSmall')).toBeFalsy();
        expect(classList.contains('DuiFab-sizeMedium')).toBeFalsy();
        expect(classList.contains('DuiFab-sizeLarge')).toBeFalsy();
        expect(classList.length).toBe(2);
    });
});
