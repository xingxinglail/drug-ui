import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { styles } from './Notification.style';
import { createUseStyles } from '../styles';
import Notice from './Notice';

export interface NotificationProps {
    arr: { key: string }[];
    c: (key: string) => void;
}

export const name = 'Notification';

type NotificationClasses = 'root';

const useStyles = createUseStyles<NotificationClasses>(styles, name);

const Notification: React.FC<NotificationProps> = props => {
    const { arr, c } = props;
    const classes = useStyles();
    const onClose = (key: string) => {
        c(key);
    };

    return (
        <div className={ classes.root }>
            {
                arr.map(c => <Notice key={ c.key } onClose={ () => onClose(c.key) } />)
            }
        </div>
    );
};

const keyName = 'Notification-key-';
let keyId = 1;
let topRightContainer: HTMLDivElement;
const arr: { key: string }[] = [];

const close = (key: string) => {
    const index = arr.findIndex(c => c.key === key);
    if (index >= 0) {
        arr.splice(index, 1);
        render(arr);
    }
};

const render = (arr: { key: string }[]) => {
    ReactDOM.render(
        <Notification arr={ arr } c={ close } />,
        topRightContainer
    );
};

// todo 过度动画
// todo css、内容参数配置

const notification = {
    open () {
        if (!topRightContainer) {
            topRightContainer = document.createElement('div');
            document.body.appendChild(topRightContainer);
        }
        arr.push({
            key: `${ keyName }${ keyId }`
        });
        render(arr);
        keyId++;
    }
};

export default notification;
