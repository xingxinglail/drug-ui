import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styles } from './Notice.style';
import { createUseStyles } from '../styles';
import classnames from 'classnames';
import Portal from './Portal';

export interface NoticeProps {
    visible: boolean;
    message: string | React.ReactNode;
    description: string | React.ReactNode;
    duration?: number;
    timeout?: number;
    onClose: () => void;
}

export const name = 'Notice';

type NoticeClasses = 'root' | 'container' | 'animated' | 'fadeInRight' | 'fadeOut' | 'message' | 'description';
let topRightContainer: HTMLDivElement;
const useStyles = createUseStyles<NoticeClasses>(styles, name);

const Notice: React.FC<NoticeProps> = props => {
    const { visible, message, description, duration: durationProp = 4500, timeout = 300, onClose } = props;
    const classes = useStyles();
    const timeId = React.useRef<number | null>(null);
    const duration = typeof durationProp === 'number' ? durationProp : 4500;

    if (!topRightContainer) {
        topRightContainer = document.createElement('div');
        topRightContainer.className = classes.container;
        document.body.appendChild(topRightContainer);
    }

    React.useEffect(() => {
        if (duration > 0 && visible) timeId.current = window.setTimeout(onClose, duration);
        return () => {
            console.log('clearTimeout');
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
        <Portal selector={ topRightContainer }>
            <Transition
                in={ visible }
                appear
                unmountOnExit
                timeout={ timeout }>
                { state => (
                    <div
                        className={
                            classnames(
                                classes.root,
                                {
                                    [classes.animated]: state === 'entering' || state === 'exiting',
                                    [classes.fadeInRight]: state === 'entering',
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

export default Notice;
