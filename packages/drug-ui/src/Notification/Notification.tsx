import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styles } from './Notification.style';
import { createUseStyles } from '../styles';
import classnames from 'classnames';
import Portal from './Portal';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface NotificationProps {
    visible: boolean;
    message: string | React.ReactNode;
    description: string | React.ReactNode;
    onClose: () => void;
    placement?: NotificationPlacement;
    duration?: number;
}

export const name = 'Notification';

type NoticeClasses =
    'root'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'animated'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'fadeOut'
    | 'notice'
    | 'message'
    | 'description';

const useStyles = createUseStyles<NoticeClasses>(styles, name);

let topLeftContainer: HTMLDivElement;
let topRightContainer: HTMLDivElement;
let bottomLeftContainer: HTMLDivElement;
let bottomRightContainer: HTMLDivElement;
// todo 优化代码
// todo style 自定义样式
// todo 自定义按钮
// todo 增加 success error info warning warn 类型
// todo 关闭按钮
const Notification: React.FC<NotificationProps> = props => {
    const { visible, message, description, duration: durationProp = 4500, placement = 'topRight', onClose } = props;
    const classes = useStyles();
    const timeId = React.useRef<number | null>(null);
    const duration = typeof durationProp === 'number' ? durationProp : 4500;
    let selector = document.createElement('div');

    if (placement === 'topLeft') {
        if (!topLeftContainer) {
            topLeftContainer = document.createElement('div');
            topLeftContainer.className = classnames(classes.root, classes[placement]);
            document.body.appendChild(topLeftContainer);
        }
        selector = topLeftContainer;
    }

    if (placement === 'topRight') {
        if (!topRightContainer) {
            topRightContainer = document.createElement('div');
            topRightContainer.className = classnames(classes.root, classes[placement]);
            document.body.appendChild(topRightContainer);
        }
        selector = topRightContainer;
    }

    if (placement === 'bottomLeft') {
        if (!bottomLeftContainer) {
            bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.className = classnames(classes.root, classes[placement]);
            document.body.appendChild(bottomLeftContainer);
        }
        selector = bottomLeftContainer;
    }

    if (placement === 'bottomRight') {
        if (!bottomRightContainer) {
            bottomRightContainer = document.createElement('div');
            bottomRightContainer.className = classnames(classes.root, classes[placement]);
            document.body.appendChild(bottomRightContainer);
        }
        selector = bottomRightContainer;
    }

    React.useEffect(() => {
        if (duration > 0 && visible) timeId.current = window.setTimeout(onClose, duration);
        return () => {
            if (timeId.current) window.clearTimeout(timeId.current);
        };
    }, [visible, duration]);

    const onMouseEnter = () => {
        if (duration > 0 && timeId.current) window.clearTimeout(timeId.current);
    };

    const onMouseLeave = () => {
        if (duration > 0) timeId.current = window.setTimeout(onClose, duration);
    };

    return (
        <Portal selector={ selector }>
            <Transition
                in={ visible }
                appear
                unmountOnExit
                timeout={ 300 }>
                { state => (
                    <div
                        className={
                            classnames(
                                classes.notice,
                                {
                                    [classes.animated]: state === 'entering' || state === 'exiting',
                                    [classes.fadeInLeft]: state === 'entering' && placement.endsWith('Left'),
                                    [classes.fadeInRight]: state === 'entering' && placement.endsWith('Right'),
                                    [classes.fadeOut]: state === 'exiting',
                                })
                        }
                        onMouseEnter={ onMouseEnter }
                        onMouseLeave={ onMouseLeave }>
                        <div onClick={ onClose }>close</div>
                        <p className={ classes.message }>{ message }</p>
                        <p className={ classes.description }>{ description }</p>
                    </div>
                ) }
            </Transition>
        </Portal>
    );
};

export default Notification;
