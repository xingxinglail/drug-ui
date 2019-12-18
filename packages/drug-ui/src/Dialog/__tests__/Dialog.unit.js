import * as React from 'react';
import * as enzyme from 'enzyme';
import EnzymeToJson from 'enzyme-to-json';
import Dialog from '..';
import { Wrapper } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Dialog />', () => {

    it('render successful', () => {
        const subject = mount(<Wrapper><Dialog visible={ true } title="title">Dialog</Dialog></Wrapper>);
        expect(EnzymeToJson(subject)).toMatchSnapshot();
    });

    it('设置 className', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true } className="my-dialog">Dialog</Dialog></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('DuiDialog-root')).toBeTruthy();
        expect(classList.contains('my-dialog')).toBeTruthy();
    });

    it('设置 zIndex', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true } zIndex={ 1111 }>Dialog</Dialog></Wrapper>);
        expect(getComputedStyle(wrapper.getDOMNode()).zIndex).toBe('1111');
    });

    it('设置 width', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true } width={ 400 }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        const paper = dom.querySelector('.DuiDialog-paper');
        expect(getComputedStyle(paper).width).toBe('400px');
        wrapper.setProps({ width: '33%' });
        expect(getComputedStyle(paper).width).toBe('33%');
    });

    it('设置 top', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true } top={ 28 }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        const paper = dom.querySelector('.DuiDialog-paper');
        expect(getComputedStyle(paper).marginTop).toBe('28px');
        wrapper.setProps({ top: '55%' });
        expect(getComputedStyle(paper).marginTop).toBe('55%');
    });

    it('设置 title', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        expect(wrapper.find('.DuiDialog-header').exists()).toBeFalsy();
        wrapper.setProps({ title: 'Title' });
        expect(wrapper.find('.DuiDialog-header').exists()).toBeTruthy();
        const Title = <div className="node-title">Title</div>;
        wrapper.setProps({ title: Title });
        expect(dom.querySelector('.node-title')).toBeTruthy();
    });

    it('设置 footer', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        expect(wrapper.find('.DuiDialog-footer').exists()).toBeFalsy();
        wrapper.setProps({ footer: 'Footer' });
        expect(wrapper.find('.DuiDialog-footer').exists()).toBeTruthy();
        const Title = <div className="node-footer">Title</div>;
        wrapper.setProps({ title: Title });
        expect(dom.querySelector('.node-footer')).toBeTruthy();
    });

    it('设置 mask', () => {
        const wrapper = mount(<Wrapper><Dialog visible={ true }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        expect(dom.querySelector('.DuiDialog-mask')).toBeTruthy();
        wrapper.setProps({ mask: false });
        expect(dom.querySelector('.DuiDialog-mask')).toBeFalsy();
    });

    it('设置 maskClosable', () => {
        const fn = jest.fn();
        const wrapper = mount(<Wrapper><Dialog visible={ true } onClose={ fn }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        const container = dom.querySelector('.DuiDialog-container');
        container.click();
        expect(fn).toBeCalled();
        wrapper.setProps({ maskClosable: false });
        container.click();
        expect(fn).toBeCalledTimes(1);
    });

    it('设置 closable', () => {
        const fn = jest.fn();
        const wrapper = mount(<Wrapper><Dialog visible={ true } onClose={ fn }>Dialog</Dialog></Wrapper>);
        const dom = wrapper.getDOMNode();
        const closeIcon = dom.querySelector('.DuiDialog-close');
        closeIcon.click();
        expect(fn).toBeCalled();
        wrapper.setProps({ closable: false });
        closeIcon.click();
        expect(fn).toBeCalledTimes(1);
        expect(dom.querySelector('.DuiDialog-close')).toBeFalsy();
    });

    it('设置 keepMounted', done => {
        const onExited = () => {
            setTimeout(() => {
                expect(wrapper.getDOMNode()).toBeTruthy();
                done();
            });
        };
        const wrapper = mount(<Wrapper><Dialog onExited={ onExited }>Dialog</Dialog></Wrapper>);
        wrapper.setProps({ visible: true });
        expect(wrapper.getDOMNode()).toBeTruthy();
        wrapper.setProps({ keepMounted: true });
        wrapper.setProps({ visible: false });
    });

    it('设置 transitionDuration', done => {
        let wrapper = null;
        let n = 1;
        let n2 = 1;
        const onEnter = node => {
            const paper = node.querySelector('.DuiDialog-mask');
            const mask = node.querySelector('.DuiDialog-paper');
            if (n === 1) {
                expect(getComputedStyle(paper).transitionDuration).toBe('100ms');
                expect(getComputedStyle(mask).transitionDuration).toBe('100ms');
                n++
            } else {
                expect(getComputedStyle(paper).transitionDuration).toBe('111ms');
                expect(getComputedStyle(mask).transitionDuration).toBe('111ms');
            }
            wrapper.setProps({ visible: false });
        }

        const onExited = node => {
            const paper = node.querySelector('.DuiDialog-mask');
            const mask = node.querySelector('.DuiDialog-paper');
            if (n2 === 1) {
                expect(getComputedStyle(paper).transitionDuration).toBe('100ms');
                expect(getComputedStyle(mask).transitionDuration).toBe('100ms');
                n2++;
                wrapper.setProps({ transitionDuration: { enter: 111, exit: 222 } });
                wrapper.setProps({ visible: true });
            } else {
                expect(getComputedStyle(paper).transitionDuration).toBe('222ms');
                expect(getComputedStyle(mask).transitionDuration).toBe('222ms');
                done();
            }
        };
        wrapper = mount(
            <Wrapper>
                <Dialog
                    transitionDuration={ 100 }
                    onEnter={ onEnter }
                    onExited={ onExited }>
                    Dialog
                </Dialog>
            </Wrapper>
        );
        wrapper.setProps({ visible: true });
    });

    it('Transition 事件触发', done => {
        const fn = jest.fn();
        const wrapper = mount(
            <Wrapper>
                <Dialog
                    onEnter={ fn }
                    onEntering={ fn }
                    onEntered={ fn }
                    onExit={ fn }
                    onExiting={ fn }
                    onExited={ fn }>Dialog</Dialog>
            </Wrapper>);
        wrapper.setProps({ visible: true });
        setTimeout(() => {
            const dom = wrapper.getDOMNode().children[0];
            wrapper.setProps({ visible: false });
            setTimeout(() => {
                const calls = fn.mock.calls;
                expect(calls[0][0]).toBe(dom);
                expect(calls[1][0]).toBe(dom);
                expect(calls[2][0]).toBe(dom);
                expect(calls[3][0]).toBe(dom);
                expect(calls[4][0]).toBe(dom);
                expect(calls[5][0]).toBe(dom);
                expect(calls.length).toBe(6);
                done();
            }, 310);
        }, 310);
    });
});
