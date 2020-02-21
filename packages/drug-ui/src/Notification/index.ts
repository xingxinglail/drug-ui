import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notification, { NotificationProps } from './Notification';
export * from './Notification';

interface Notices {
    keyProp: string;
    props: NotificationProps;
    container: HTMLDivElement;
}

let keyID = 1;
const noticeKey = `${ name }-key-`;
const notices: Notices[] = [];

const render = (props: NotificationProps, key: string, container: HTMLDivElement) => {
    ReactDOM.render(React.createElement(Notification, props), container)
};

const close = (key: string) => {
    if (key) {
        const index = notices.findIndex(c => c.keyProp === key);
        if (index >= 0) {
            const { props, container } = notices[index];
            render(Object.assign(props, { visible: false }), key, container);
            notices.splice(index, 1);
        }
    }
};

export interface Config extends Omit<NotificationProps, 'visible' | 'onClose'> {
    key?: string;
    onClose?: () => void;
}

const notification = {
    open (config: Config) {
        if (!config) return;
        const defaultKey = `${ noticeKey }${ keyID }`;
        const { key = defaultKey, onClose: onCloseProp, ...rest } = config;

        const onClose = () => {
            close(key);
            onCloseProp && onCloseProp();
        };

        const props = {
            visible: true,
            onClose,
            keyProp: key,
            ...rest
        };

        const index = notices.findIndex(c => c.keyProp === key);
        if (index >= 0) {
            const { container } = notices[index];
            notices.splice(index, 1, { keyProp: key, props, container });
            render(Object.assign(props), key, container);
            return;
        }

        const div = document.createElement('div');
        render(props, key, div);
        notices.push({ keyProp: key, props, container: div });
        keyID++;
    },
    close (key: string) {
        close(key);
    },
    destroy () {
        while (notices.length) {
            const { container } = notices.pop()!;
            console.log(container);
            console.log(container.parentNode);
            ReactDOM.unmountComponentAtNode(container)
        }
    }
};

export default notification;