import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Fade from '..';
import { Wrapper, getClasses, wait } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Fade />', () => {

    let classes;

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Fade /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
        classes = getClasses(<Fade />);
    });

    it('默认渲染', () => {
        const wrapper = mount(<Wrapper><Fade>Children</Fade></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.container)).toBeTruthy();
        expect(classList.contains(classes.hidden)).toBeTruthy();
    });

    it('默认显示渲染', () => {
        const wrapper = mount(<Wrapper><Fade in>Children</Fade></Wrapper>);
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains(classes.container)).toBeTruthy();
        expect(classList.contains(classes.entered)).toBeTruthy();
    });

    it('触发所有钩子', (done) => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn(async () => {
            expect(window.getComputedStyle(dom).getPropertyValue('opacity')).toEqual('1');
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
                <Fade
                    onEnter={ onEnter }
                    onEntering={ onEntering }
                    onEntered={ onEntered }
                    onExit={ onExit }
                    onExiting={ onExiting }
                    onExited={ onExited }>
                    <div />
                </Fade>
            </Wrapper>
        );
        const dom = wrapper.getDOMNode();
        expect(window.getComputedStyle(dom).getPropertyValue('opacity')).toEqual('0');
        wrapper.setProps({ in: true });
    });
});
