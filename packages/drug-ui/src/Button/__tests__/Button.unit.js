import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Button from '..';
import { Wrapper, getClasses } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Button />', () => {

    let classes;

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Button /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
        classes = getClasses(<Button />);
    });

    it('渲染普通按钮', () => {
        const wrapper = mount(<Wrapper><Button>Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.root)).toBeTruthy();
        expect(classList.contains(classes.text)).toBeTruthy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.containedPrimary)).toBeFalsy();
        expect(classList.contains(classes.containedSecondary)).toBeFalsy();
        expect(classList.contains(classes.containedSizeSmall)).toBeFalsy();
        expect(classList.contains(classes.containedSizeLarge)).toBeFalsy();
        expect(classList.contains(classes.textPrimary)).toBeFalsy();
        expect(classList.contains(classes.textSecondary)).toBeFalsy();
        expect(classList.contains(classes.textSizeSmall)).toBeFalsy();
        expect(classList.contains(classes.textSizeLarge)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeFalsy();
        expect(classList.contains(classes.outlinedPrimary)).toBeFalsy();
        expect(classList.contains(classes.outlinedSecondary)).toBeFalsy();
        expect(classList.contains(classes.outlinedSizeSmall)).toBeFalsy();
        expect(classList.contains(classes.outlinedSizeLarge)).toBeFalsy();
        expect(classList.contains(classes.colorInherit)).toBeFalsy();
        expect(classList.contains(classes.round)).toBeFalsy();
        expect(classList.contains(classes.fullWidth)).toBeFalsy();
        expect(classList.contains(classes.disabled)).toBeFalsy();
        expect(classList.contains(classes.label)).toBeFalsy();
        expect(classList.contains(classes.loading)).toBeFalsy();
    });

    it('渲染 color = primary', () => {
        const wrapper = mount(<Wrapper><Button color="primary">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeTruthy();
        expect(classList.contains(classes.containedPrimary)).toBeFalsy();
        expect(classList.contains(classes.textPrimary)).toBeTruthy();
        expect(classList.contains(classes.textSecondary)).toBeFalsy();
        expect(classList.contains(classes.outlinedPrimary)).toBeFalsy();
        expect(classList.contains(classes.outlinedSecondary)).toBeFalsy();
        expect(classList.contains(classes.colorInherit)).toBeFalsy();
    });

    it('渲染 color = secondary', () => {
        const wrapper = mount(<Wrapper><Button color="secondary">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeTruthy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.textSecondary)).toBeTruthy();
        expect(classList.contains(classes.textPrimary)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeFalsy();
        expect(classList.contains(classes.outlinedSecondary)).toBeFalsy();
        expect(classList.contains(classes.colorInherit)).toBeFalsy();
    });

    it('渲染 color = inherit', () => {
        const wrapper = mount(<Wrapper><Button color="inherit">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeTruthy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.textSecondary)).toBeFalsy();
        expect(classList.contains(classes.textPrimary)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeFalsy();
        expect(classList.contains(classes.colorInherit)).toBeTruthy();
    });

    it('渲染 variant = outlined', () => {
        const wrapper = mount(<Wrapper><Button variant="outlined">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeFalsy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeTruthy();
    });

    it('渲染 variant = contained', () => {
        const wrapper = mount(<Wrapper><Button variant="contained">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeFalsy();
        expect(classList.contains(classes.contained)).toBeTruthy();
        expect(classList.contains(classes.outlined)).toBeFalsy();
    });

    it('渲染 variant = outlined color = primary', () => {
        const wrapper = mount(<Wrapper><Button variant="outlined" color="primary">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeFalsy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeTruthy();
        expect(classList.contains(classes.outlinedPrimary)).toBeTruthy();
    });

    it('渲染 variant = outlined color = secondary', () => {
        const wrapper = mount(<Wrapper><Button variant="outlined" color="secondary">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeFalsy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeTruthy();
        expect(classList.contains(classes.outlinedSecondary)).toBeTruthy();
    });

    it('渲染 variant = outlined color = inherit', () => {
        const wrapper = mount(<Wrapper><Button variant="outlined" color="inherit">Hello World</Button></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.text)).toBeFalsy();
        expect(classList.contains(classes.contained)).toBeFalsy();
        expect(classList.contains(classes.outlined)).toBeTruthy();
        expect(classList.contains(classes.colorInherit)).toBeTruthy();
    });

    it('设置 className', () => {
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

    it('设置 disabled', () => {
        const wrapper = mount(<Wrapper><Button disabled /></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiButtonBase-root')).toBeTruthy();
        expect(classList.contains('DuiButton-root')).toBeTruthy();
        expect(classList.contains('DuiButton-text')).toBeTruthy();
        expect(classList.contains('DuiButtonBase-disabled')).toBeTruthy();
        expect(classList.contains('DuiButton-disabled')).toBeTruthy();
        expect(classList.length).toBe(5);
    });
});
