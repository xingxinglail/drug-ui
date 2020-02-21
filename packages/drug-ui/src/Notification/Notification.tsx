import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styles } from './Notification.style';
import { createUseStyles } from '../styles';
import ThemeProvider from '../ThemeProvider';
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
    style?: React.CSSProperties;
    btn?: React.ReactNode;
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
    | 'description'
    | 'btn';

const useStyles = createUseStyles<NoticeClasses>(styles, name);

// todo 增加 success error info warning warn 类型
// todo 关闭按钮
// todo 自定义container

const getSelector = (placementClassName: string, classes: string): HTMLDivElement => {
    let container: HTMLDivElement | null = document.querySelector(`.${ placementClassName }`);
    if (!container) {
        container = document.createElement('div');
        container.className = classes;
        document.body.appendChild(container);
    }
    return container;
};

const Notification: React.FC<NotificationProps> = props => {
    const { visible, message, description, duration: durationProp = 4500, placement = 'topRight', style, btn, onClose } = props;
    const classes = useStyles();
    const timeId = React.useRef<number | null>(null);
    const duration = typeof durationProp === 'number' ? durationProp : 4500;
    const selector = getSelector(classes[placement], classnames(classes.root, classes[placement]));

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
        <ThemeProvider>
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
                            style={ style }
                            onMouseEnter={ onMouseEnter }
                            onMouseLeave={ onMouseLeave }>
                            <div onClick={ onClose }>close</div>
                            <p className={ classes.message }>{ message }</p>
                            <p className={ classes.description }>{ description }</p>
                            { btn && <div className={ classes.btn }>{ btn }</div> }
                        </div>
                    ) }
                </Transition>
            </Portal>
        </ThemeProvider>
    );
};

export default Notification;
