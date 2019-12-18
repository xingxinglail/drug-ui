import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { IconButton, SimpleSpread } from '@drug-ui/core';
import { createUseStyles } from '@drug-ui/core/styles';
import { useCombinedRefs } from '@drug-ui/hooks';
import { Close } from '@drug-ui/icons';
import { styles } from './Dialog.style';

interface PropsExtra {
    title?: React.ReactNode | string;
}

export interface IProps extends SimpleSpread<React.HTMLAttributes<HTMLDivElement>, PropsExtra> {
    visible?: boolean;
    zIndex?: number;
    width?: string | number;
    top?: string | number;
    footer?: React.ReactNode | string;
    mask?: boolean;
    maskClosable?: boolean;
    closable?: boolean;
    keepMounted?: boolean;
    transitionDuration?: number | { enter?: number, exit?: number };
    ref?: React.Ref<HTMLDivElement>;
    onClose?: (e: React.MouseEvent) => void;
    onEnter?: (e: HTMLElement) => void;
    onEntering?: (e: HTMLElement) => void;
    onEntered?: (e: HTMLElement) => void;
    onExit?: (e: HTMLElement) => void;
    onExiting?: (e: HTMLElement) => void;
    onExited?: (e: HTMLElement) => void;
}

type LayoutClassProps = 'root' | 'mask' | 'container' | 'paper' | 'header' | 'close' | 'body' | 'footer';

const name = 'Dialog';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

const maskTransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const maskDefaultStyle = {
    transition: 'opacity 300ms',
    opacity: 0
};

const paperDefaultStyle = {
    transition: 'transform 300ms, opacity 300ms',
    opacity: 0,
    transform: 'translate3d(0, -20px, 0)',
};

const paperTransitionStyles = {
    entering: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    entered: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    exiting: { opacity: 0, transform: 'translate3d(0, -20px, 0)' },
    exited: { opacity: 0, transform: 'translate3d(0, -20px, 0)' },
};

const Portal: React.FC = props => {
    return ReactDOM.createPortal(
        props.children,
        document.body
    );
};

const Dialog: React.FC<IProps> = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
    const { visible, className, keepMounted, title, footer, width, zIndex, top, children, mask, maskClosable, closable, onClose, transitionDuration = 300, ...rest } = props;
    const [exited, setExited] = React.useState(true);
    const classes = useStyles();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const classNames = classnames(
        classes.root,
        className
    );

    const closeHandle = (e: React.MouseEvent) => {
        onClose && onClose(e);
    };

    const paperHandleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    React.useLayoutEffect(() => {
        // So the animation always start from the start.
        innerRef.current?.scrollTop;
        document.body.style.overflow = visible ? 'hidden' : '';
    }, [visible]);

    if (!keepMounted && !visible && exited) return null;

    const handleExitTransitionDuration = (node: HTMLElement, type: string) => {
        const paper: HTMLDivElement | null = node.querySelector(`.${ classes.paper }`);
        const mask: HTMLDivElement | null = node.querySelector(`.${ classes.mask }`);
        const duration = `${ typeof transitionDuration === 'number' ? transitionDuration : transitionDuration[type] }ms`;
        if (mask) mask.style.transitionDuration = duration;
        if (paper) paper.style.transitionDuration = duration;
    };

    const handleTransitionEvent = (event: string, e: HTMLElement) => {
        if (event === 'onEnter') {
            setExited(false);
            handleExitTransitionDuration(e, 'enter');
        }
        if (event === 'onExit') handleExitTransitionDuration(e, 'exit');
        if (event === 'onExited') setExited(true);
        rest[event] && rest[event](e);
    };

    return (
        <Portal>
            <div
                className={ classNames }
                style={ { zIndex, visibility: (!visible && exited) ? 'hidden' : 'visible' } }
                ref={ combinedRef }>
                <Transition
                    appear
                    in={ visible }
                    timeout={ transitionDuration }
                    onEnter={ e => handleTransitionEvent('onEnter', e) }
                    onEntering={ e => handleTransitionEvent('onEntering', e) }
                    onEntered={ e => handleTransitionEvent('onEntered', e) }
                    onExit={ e => handleTransitionEvent('onExit', e) }
                    onExiting={ e => handleTransitionEvent('onExiting', e) }
                    onExited={ e => handleTransitionEvent('onExited', e) }>
                    { state => (
                        <div>
                            { !mask ? null :
                                <div
                                    className={ classes.mask }
                                    style={ { ...maskDefaultStyle, ...maskTransitionStyles[state] } } />
                            }
                            <div
                                className={ classes.container }
                                onClick={ e => maskClosable && closeHandle(e) }>
                                <div
                                    className={ classes.paper }
                                    style={ {
                                        width,
                                        marginTop: top, ...paperDefaultStyle, ...paperTransitionStyles[state]
                                    } }
                                    onClick={ paperHandleClick }>
                                    {
                                        !closable ? null :
                                            <div
                                                className={ classes.close }
                                                onClick={ closeHandle }>
                                                <IconButton size="small">
                                                    <Close />
                                                </IconButton>
                                            </div>
                                    }
                                    {
                                        !title ? null :
                                            <div className={ classes.header }>
                                                <h2>{ title }</h2>
                                            </div>
                                    }
                                    <div className={ classes.body }>{ children }</div>
                                    { footer ? <div className={ classes.footer }>{ footer }</div> : null }
                                </div>
                            </div>
                        </div>
                    ) }
                </Transition>
            </div>
        </Portal>
    );
});

Dialog.displayName = name;
Dialog.defaultProps = {
    visible: false,
    title: '',
    zIndex: 1000,
    width: '50%',
    top: '15vh',
    mask: true,
    maskClosable: true,
    closable: true,
    keepMounted: false,
    transitionDuration: 300,
    onClose: undefined,
    onEnter: undefined,
    onEntering: undefined,
    onEntered: undefined,
    onExit: undefined,
    onExiting: undefined,
    onExited: undefined
};

Dialog.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    zIndex: PropTypes.number,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    top: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    closable: PropTypes.bool,
    keepMounted: PropTypes.bool,
    transitionDuration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    onClose: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func
};

export default Dialog;

