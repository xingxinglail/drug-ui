import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Zoom from '..';
import { Wrapper, wait } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

describe('<Zoom />', () => {

    it('render successful', () => {
        const json = renderer.create(<Wrapper><Zoom><div /></Zoom></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('默认渲染', () => {
        const wrapper = mount(<Wrapper><Zoom><div /></Zoom></Wrapper>);
        expect(window.getComputedStyle(wrapper.getDOMNode()).visibility).toEqual('hidden');
    });

    it('默认显示渲染', () => {
        const wrapper = mount(<Wrapper><Zoom in><div /></Zoom></Wrapper>);
        expect(window.getComputedStyle(wrapper.getDOMNode()).visibility).toEqual('');
    });

    it('触发所有钩子', (done) => {
        const onEnter = jest.fn();
        const onEntering = jest.fn();
        const onEntered = jest.fn(async () => {
            expect(window.getComputedStyle(dom).getPropertyValue('visibility')).toEqual('');
            expect(window.getComputedStyle(dom).getPropertyValue('transform')).toEqual('scale(1)');
            await wait();
            wrapper.setProps({ in: false });
        });
        const onExit = jest.fn();
        const onExiting = jest.fn();
        const onExited = jest.fn(() => {
            expect(window.getComputedStyle(dom).getPropertyValue('visibility')).toEqual('hidden');
            expect(window.getComputedStyle(dom).getPropertyValue('transform')).toEqual('scale(0)');
            expect(onEnter).toHaveBeenCalledBefore(onEntering);
            expect(onEntering).toHaveBeenCalledBefore(onEntered);
            expect(onEntered).toHaveBeenCalledBefore(onExit);
            expect(onExit).toHaveBeenCalledBefore(onExiting);
            expect(onExiting).toHaveBeenCalledBefore(onExited);
            done();
        });

        const wrapper = mount(
            <Wrapper>
                <Zoom
                    onEnter={ onEnter }
                    onEntering={ onEntering }
                    onEntered={ onEntered }
                    onExit={ onExit }
                    onExiting={ onExiting }
                    onExited={ onExited }>
                    <div />
                </Zoom>
            </Wrapper>
        );
        const dom = wrapper.getDOMNode();
        expect(window.getComputedStyle(dom).getPropertyValue('visibility')).toEqual('hidden');
        wrapper.setProps({ in: true });
    });
});
