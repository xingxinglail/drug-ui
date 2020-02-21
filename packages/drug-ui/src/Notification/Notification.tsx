import * as React from 'react';
import { Transition } from 'react-transition-group';
import classnames from 'classnames';
import { styles } from './Notification.style';
import { createUseStyles } from '../styles';
import ThemeProvider from '../ThemeProvider';
import Portal from './Portal';
import SvgIcon from '../SvgIcon';

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export type NotificationType = 'success' | 'info' | 'error' | 'warning';

export interface NotificationProps {
    visible: boolean;
    message: string | React.ReactNode;
    description: string | React.ReactNode;
    onClose: () => void;
    placement?: NotificationPlacement;
    duration?: number;
    style?: React.CSSProperties;
    btn?: React.ReactNode;
    readonly type?: NotificationType;
    icon?: React.ReactNode;
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
    | 'btn'
    | 'iconWrapper'
    | 'icon'
    | 'success'
    | 'info'
    | 'warning'
    | 'error';

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
    const { visible, message, description, duration: durationProp = 4500, placement = 'topRight', style, btn, type, icon: iconProp, onClose } = props;
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

    const IconWrapper = () => {
        if (type || iconProp) {
            let Icon = iconProp;
            if (!Icon) {
                let d = '';
                switch (type) {
                    case 'success':
                        d = 'M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z';
                        break;
                    case 'warning':
                        d = 'M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z';
                        break;
                    case 'info':
                    case 'error':
                        d = 'M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z';
                        break;
                }
                Icon = (
                    <SvgIcon className={ classes.icon }>
                        <path d={ d } />
                    </SvgIcon>
                );
            }
            return (
                <div className={ classnames(classes.iconWrapper, { [classes[type!]]: type }) }>
                    { Icon }
                </div>
            );
        }
        return null;
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
                            <IconWrapper />
                            <div>
                                <p className={ classes.message }>{ message }</p>
                                <p className={ classes.description }>{ description }</p>
                                { btn && <div className={ classes.btn }>{ btn }</div> }
                            </div>
                        </div>
                    ) }
                </Transition>
            </Portal>
        </ThemeProvider>
    );
};

export default Notification;
