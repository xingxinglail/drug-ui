import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Notification, { NotificationProps } from './Notification';

// todo css、内容参数配置

export interface Config {
    message: string | React.ReactNode;
    description: string | React.ReactNode;
    key?: string;
    duration?: number;
    onClose?: () => void;
}

interface Notices {
    keyProp: string;
    props: NotificationProps;
    container: HTMLDivElement;
}

let keyID = 1;
const noticeKey = `${ name }-key-`;
const notices: Notices[] = [];

const render = (props: NotificationProps, key: string, container: HTMLDivElement) => {
    // ReactDOM.render(<Notification key={ key } { ...props } />, container);
    ReactDOM.render(React.createElement(Notification, { key, ...props }), container)
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
            const { props, keyProp, container } = notices.pop()!;
            render(Object.assign(props, { visible: false, timeout: 0 }), keyProp, container);
        }
    }
};

export default notification;
