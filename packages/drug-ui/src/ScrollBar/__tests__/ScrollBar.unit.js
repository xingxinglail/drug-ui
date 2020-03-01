import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import ScrollBar from '..';
import { Wrapper, getClasses } from '@drug-ui/core/test-utils';

const mount = enzyme.mount;

global.ResizeObserver = class {
    constructor (callback) {
        callback && callback();
    }

    unobserve () {
    }

    observe () {
    }
};

global.MutationObserver = class {
    constructor (callback) {
        callback && callback();
    }

    disconnect () {
    }

    observe (element, initObject) {
    }
};

describe('<ScrollBar />', () => {

    let classes;

    it('render successful', () => {
        const json = renderer.create(<Wrapper><ScrollBar /></Wrapper>).toJSON();
        expect(json).toMatchSnapshot();
        classes = getClasses(<ScrollBar />);
    });

    it('正常渲染', () => {
        const wrapper = mount(
            <Wrapper>
                <ScrollBar style={ { width: 300, height: 300 } }>
                    <div style={ { width: 100, height: 100 } } />
                </ScrollBar>
            </Wrapper>
        );
        const dom = wrapper.getDOMNode();
        const root = dom.querySelector(`.${ classes.root }`);
        expect(root.querySelectorAll(`.${ classes.track }`).length).toEqual(2);
        expect(root.classList.contains(classes.root)).toBeTruthy();
        expect(window.getComputedStyle(root).getPropertyValue('width')).toEqual('300px');
        expect(window.getComputedStyle(root).getPropertyValue('height')).toEqual('300px');
        const trackVertical = root.querySelector(`.${ classes.trackVertical }`);
        expect(window.getComputedStyle(trackVertical).getPropertyValue('visibility')).toEqual('hidden');
        const scrollbarVertical = root.querySelector(`.${ classes.scrollbarVertical }`);
        expect(scrollbarVertical.classList.contains(classes.scrollbar)).toBeTruthy();
        expect(scrollbarVertical.classList.contains(classes.scrollbarHide)).toBeTruthy();
        const trackHorizontal = root.querySelector(`.${ classes.trackHorizontal }`);
        expect(window.getComputedStyle(trackHorizontal).getPropertyValue('visibility')).toEqual('hidden');
        const scrollbarHorizontal = root.querySelector(`.${ classes.scrollbarHorizontal }`);
        expect(scrollbarHorizontal.classList.contains(classes.scrollbar)).toBeTruthy();
        expect(scrollbarHorizontal.classList.contains(classes.scrollbarHide)).toBeTruthy();
        wrapper.simulate('mousedown');
        wrapper.find(`.${ classes.contentWrapper }`).at(0).simulate('scroll');
    });
});
