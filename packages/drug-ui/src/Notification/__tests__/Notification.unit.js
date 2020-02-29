import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import { wait } from '@drug-ui/core/test-utils';
import Notification from '../Notification';
import notification from '..';

const mount = enzyme.mount;

describe('Notification', () => {

    let classes;

    const getClasses = (element) => {
        // @ts-ignore
        const { useStyles } = element.type;
        let classes;

        function Listener () {
            classes = useStyles();
            return null;
        }

        enzyme.mount(<Listener />);
        return classes;
    };

    const open = (args) => {
        notification.open({
            message: 'message',
            description: 'description',
            ...args
        });
    };

    it('render successful', () => {
        const json = renderer.create(<Notification />).toJSON();
        expect(json).toMatchSnapshot();
        classes = getClasses(<Notification />);
        const dom = document.body.querySelector(`.${ classes.root }`);
        dom.remove();
    });

    it('simulate mouseenter mouseleave', async () => {
        const fn = jest.fn();
        const wrapper = mount(
            <Notification visible duration={ 100 } onClose={ fn } />
        );
        await wait(90);
        wrapper.simulate('mouseenter');
        await wait(90);
        expect(fn).not.toBeCalled();
        wrapper.simulate('mouseleave');
        await wait(110);
        expect(fn).toBeCalled();
        expect(fn).toBeCalledTimes(1);
        const dom = document.body.querySelector(`.${ classes.root }`);
        dom.remove();
    });

    it('message', () => {
        const message = 'title';
        open({
            message
        });
        const dom = document.body.querySelector(`.${ classes.root }`);
        const msgDom = dom.querySelector(`.${ classes.message }`);
        expect(msgDom.innerHTML).toEqual(message);
        dom.remove();
    });

    it('description', () => {
        const description = 'description';
        open({
            description
        });
        const dom = document.body.querySelector(`.${ classes.root }`);
        const msgDom = dom.querySelector(`.${ classes.description }`);
        expect(msgDom.innerHTML).toEqual(description);
        dom.remove();
    });

    it('duration and onClose', async () => {
        const fn = jest.fn();
        open({
            duration: 100,
            onClose: fn
        });
        const dom = document.body.querySelector(`.${ classes.root }`);
        await wait(100);
        expect(fn).toBeCalled();
        dom.remove();
    });

    it('style', () => {
        const style = {
            width: 400,
            backgroundColor: 'rgb(229, 229, 229)'
        };
        open({
            style
        });
        const dom = document.body.querySelector(`.${ classes.root }`).children[0];
        const styles = window.getComputedStyle(dom);
        expect(styles.width).toEqual(`${ style.width }px`);
        expect(styles.backgroundColor).toEqual(style.backgroundColor);
        dom.parentNode.remove();
    });

    it('btn', () => {
        open({
            btn: <span className="btn-test" />
        });
        const dom = document.body.querySelector(`.${ classes.root }`).children[0];
        expect(dom.querySelector('.btn-test')).toBeTruthy();
        dom.parentNode.remove();
    });

    it('icon', () => {
        open({
            icon: <span className="icon-test" />
        });
        const dom = document.body.querySelector(`.${ classes.root }`).children[0];
        expect(dom.querySelector('.icon-test')).toBeTruthy();
        dom.parentNode.remove();
    });

    it('closeIcon', () => {
        const fn = jest.fn();
        open({
            closeIcon: <span className="close-icon-test" />,
            onClose: fn
        });
        const dom = document.body.querySelector(`.${ classes.root }`).children[0];
        expect(dom.querySelector('.close-icon-test')).toBeTruthy();
        dom.querySelector(`.${ classes.close }`).click();
        expect(fn).toBeCalled();
        dom.parentNode.remove();
    });

    it('className', () => {
        const className = 'notice-test';
        open({
            className
        });
        const dom = document.body.querySelector(`.${ className }`);
        expect(dom).toBeTruthy();
        dom.parentNode.remove();
    });

    it('getContainer', () => {
        const className = 'notice-test';
        open({
            getContainer () {
                const container = document.createElement('div');
                container.className = 'container-test';
                document.body.appendChild(container);
                return container;
            }
        });
        const dom = document.body.querySelector('.container-test');
        expect(dom).toBeTruthy();
        expect(dom.querySelector(`.${ classes.root }`)).toBeTruthy();
        dom.remove();
    });

    it('onClick', () => {
        const fn = jest.fn();
        open({
            onClick: fn
        });
        const dom = document.body.querySelector(`.${ classes.root }`).children[0];
        dom.click();
        expect(fn).toBeCalled();
        dom.parentNode.remove();
    });

    describe('placement', () => {

        it('topRight', () => {
            open({
                placement: 'topRight',
                top: 100
            });
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom.classList.contains(classes.topRight));
            expect(window.getComputedStyle(dom).top).toEqual('100px');
            dom.remove();
        });

        it('topLeft', () => {
            open({
                placement: 'topLeft',
                top: 100
            });
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom.classList.contains(classes.topLeft));
            expect(window.getComputedStyle(dom).top).toEqual('100px');
            dom.remove();
        });

        it('bottomLeft', () => {
            open({
                placement: 'bottomLeft',
                bottom: 100
            });
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom.classList.contains(classes.bottomLeft));
            expect(window.getComputedStyle(dom).bottom).toEqual('100px');
            dom.remove();
        });

        it('bottomRight', () => {
            open({
                placement: 'bottomRight',
                bottom: 100
            });
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom.classList.contains(classes.bottomRight));
            expect(window.getComputedStyle(dom).bottom).toEqual('100px');
            dom.remove();
        });
    });

    describe('type', () => {

        it('success', () => {
            open({
                type: 'success'
            });
            const dom = document.body.querySelector(`.${ classes.root }`).children[0];
            expect(dom.querySelector(`.${ classes.success }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.info }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.waring }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.error }`)).toBeFalsy();
            dom.parentNode.remove();
        });

        it('info', () => {
            open({
                type: 'info'
            });
            const dom = document.body.querySelector(`.${ classes.root }`).children[0];
            expect(dom.querySelector(`.${ classes.success }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.info }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.waring }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.error }`)).toBeFalsy();
            dom.parentNode.remove();
        });

        it('waring', () => {
            open({
                type: 'waring'
            });
            const dom = document.body.querySelector(`.${ classes.root }`).children[0];
            expect(dom.querySelector(`.${ classes.success }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.info }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.waring }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.error }`)).toBeFalsy();
            dom.parentNode.remove();
        });

        it('error', () => {
            open({
                type: 'error'
            });
            const dom = document.body.querySelector(`.${ classes.root }`).children[0];
            expect(dom.querySelector(`.${ classes.success }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.info }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.waring }`)).toBeFalsy();
            expect(dom.querySelector(`.${ classes.error }`)).toBeTruthy();
            dom.parentNode.remove();
        });
    });

    describe('api', () => {

        it('type', () => {
            ['success', 'info', 'warning', 'error', 'warn'].forEach(type => {
                notification[type]({
                    message: 'message',
                    description: 'description'
                });
            });
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom.children.length).toEqual(5);
            expect(dom.querySelector(`.${ classes.success }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.info }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.warning }`)).toBeTruthy();
            expect(dom.querySelector(`.${ classes.error }`)).toBeTruthy();
            dom.remove();
        });

        it('close', async () => {
            const key = 'key-cloes';
            const fn = jest.fn();
            open({
                key,
                onClose: fn
            });
            await wait();
            notification.close(key);
            expect(fn).toBeCalled();
            document.body.querySelector(`.${ classes.root }`).remove();
        });

        it('根据 key 更新组件', async () => {
            const key = 'key-update';
            const fn = jest.fn();
            let message = 'message';
            let description = 'description';
            let duration = 0;
            open({
                message,
                description,
                duration,
                key,
                onClose: fn
            });
            const dom = document.body.querySelector(`.${ classes.root }`).children[0];
            expect(dom.querySelector(`.${ classes.message }`).innerHTML).toEqual(message);
            expect(dom.querySelector(`.${ classes.description }`).innerHTML).toEqual(description);
            await wait();
            message = 'new message';
            description = 'new description';
            duration = 100;
            open({
                message,
                description,
                duration,
                key,
                onClose: fn
            });
            expect(dom.querySelector(`.${ classes.message }`).innerHTML).toEqual(message);
            expect(dom.querySelector(`.${ classes.description }`).innerHTML).toEqual(description);
            await wait(100);
            expect(fn).toBeCalled();
            dom.parentNode.remove();
        });

        it('open options null', () => {
            notification.open();
            const dom = document.body.querySelector(`.${ classes.root }`);
            expect(dom).toBeFalsy();
        });

        it('destroy', () => {
            open({});
            open({
                placement: 'topLeft'
            });
            open({
                placement: 'bottomLeft'
            });
            open({
                placement: 'bottomRight'
            });
            open({
                placement: 'topLeft'
            });
            const doms = document.body.querySelectorAll(`.${ classes.root }`);
            expect(doms.length).toEqual(4);
            expect(document.body.querySelectorAll(`.${ classes.notice }`).length).toEqual(5);
            notification.destroy();
            expect(document.body.querySelectorAll(`.${ classes.notice }`).length).toEqual(0);
            doms.forEach(dom => {
                dom.remove();
            });
        });
    });
});
