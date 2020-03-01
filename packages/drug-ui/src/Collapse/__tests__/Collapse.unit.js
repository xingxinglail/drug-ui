import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Collapse from '..';
import { Wrapper, getClasses, wait } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Collapse />', () => {

    let classes;

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Collapse /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
        classes = getClasses(<Collapse />);
    });

    it('默认渲染', () => {
        const wrapper = mount(<Wrapper><Collapse>Children</Collapse></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.container)).toBeTruthy();
        expect(classList.contains(classes.hidden)).toBeTruthy();
    });

    it('默认显示渲染', () => {
        const wrapper = mount(<Wrapper><Collapse in>Children</Collapse></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.container)).toBeTruthy();
        expect(classList.contains(classes.entered)).toBeTruthy();
    });

    it('collapsedHeight', (done) => {
        const onEntered = async () => {
            expect(dom.classList.contains(classes.entered)).toBeTruthy();
            expect(window.getComputedStyle(dom).getPropertyValue('height')).toEqual('auto');
            await wait();
            wrapper.setProps({ in: false });
        };

        const onExiting = async () => {
            expect(dom.classList.contains(classes.entered)).toBeFalsy();
            expect(window.getComputedStyle(dom).getPropertyValue('height')).toEqual('40px');
            done();
        };

        const wrapper = mount(
            <Wrapper>
                <Collapse collapsedHeight={ 40 } onEntered={ onEntered } onExiting={ onExiting }>
                    <div style={ { height: 200 } } />
                </Collapse>
            </Wrapper>
        );
        const dom = wrapper.getDOMNode();
        expect(window.getComputedStyle(dom).getPropertyValue('min-height')).toEqual('40px');
        wrapper.setProps({ in: true });
    });

    it('触发所有钩子', (done) => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn(async () => {
            await wait();
            wrapper.setProps({ in: false });
        });
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn(() => {
            expect(onEnter).toHaveBeenCalledBefore(onEntering);
            expect(onEntering).toHaveBeenCalledBefore(onEntered);
            expect(onEntered).toHaveBeenCalledBefore(onExit);
            expect(onExit).toHaveBeenCalledBefore(onExiting);
            expect(onExiting).toHaveBeenCalledBefore(onExited);
            done();
        });

        const wrapper = mount(
            <Wrapper>
                <Collapse
                    onEnter={ onEnter }
                    onEntering={ onEntering }
                    onEntered={ onEntered }
                    onExit={ onExit }
                    onExiting={ onExiting }
                    onExited={ onExited }>
                    <div style={ { height: 200 } } />
                </Collapse>
            </Wrapper>
        );
        const dom = wrapper.getDOMNode();
        expect(window.getComputedStyle(dom).getPropertyValue('min-height')).toEqual('0px');
        wrapper.setProps({ in: true });
    });
});
