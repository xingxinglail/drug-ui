import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { styles } from './Notification.style';
import { createUseStyles } from '../styles';
import Notice from './Notice';
import Portal from './Portal';

export interface NotificationProps {
    visible: boolean;
    onClose: () => void;
    keyProp?: string;
}

export const name = 'Notification';

type NotificationClasses = 'root';

const useStyles = createUseStyles<NotificationClasses>(styles, name);
let topRightContainer: HTMLDivElement;

// const Notification: React.FC<NotificationProps> = props => {
//     const { arr, c } = props;
//     const classes = useStyles();
//     const onClose = (key: string) => {
//         c(key);
//     };
//
//     return (
//         <div className={ classes.root }>
//             {
//                 arr.map(c => <Notice key={ c.key } onClose={ () => onClose(c.key) } />)
//             }
//         </div>
//     );
// };
const Notification: React.FC<NotificationProps> = props => {
    const { keyProp, visible, onClose } = props;
    const classes = useStyles();
    if (!topRightContainer) {
        topRightContainer = document.createElement('div');
        topRightContainer.className = classes.root;
        document.body.appendChild(topRightContainer);
    }

    return (
        <Portal selector={ topRightContainer }>
            <Notice key={ keyProp } visible={ visible } onClose={ onClose } />
        </Portal>
    );
};

// todo 传key值修改内容或关闭
// todo css、内容参数配置

export interface Config {
    key?: string;
    duration?: number;
    onClose?: () => void;
}

const defaultConfig: Config = {
    duration: 4500
};

interface Notices {
    keyProp: string;
    props: NotificationProps;
    container: HTMLDivElement;
}

// todo 优化这个数组 存入 timerid 、关闭后删除等
const notices: Notices[] = [];

const notification = {
    open (config?: Config) {
        const { key = '13', duration: durationProp = 4500, onClose: onCloseProp } = config || defaultConfig;
        const duration = typeof durationProp === 'number' ? durationProp : defaultConfig.duration;

        const div = document.createElement('div');

        const close = () => {
            if (timerId) clearTimeout(timerId);
            render(Object.assign(props, { visible: false }));
        };

        let timerId: number | null = null;
        if (duration !== 0) {
            timerId = window.setTimeout(close, duration);
        }

        const onClose = () => {
            close();
            onCloseProp && onCloseProp();
        };

        const props = {
            visible: true,
            onClose,
            keyProp: key
        };

        const render = (props: NotificationProps) => {
            ReactDOM.render(React.createElement(Notification, props), div);
        };
        render(props);
        notices.push({ keyProp: key, props, container: div });
    },
    close (key: string) {
        if (key) {
            const notice = notices.find(c => c.keyProp === key);
            if (notice) ReactDOM.render(React.createElement(Notification, Object.assign(notice.props, { visible: false })), notice.container);
        }
    }
};

export default notification;
