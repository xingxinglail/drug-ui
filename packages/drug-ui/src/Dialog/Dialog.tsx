import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import { IconButton } from '@drug-ui/core';
import { createUseStyles } from '@drug-ui/core/styles';
import { Close } from '@drug-ui/icons';
import { styles } from './Dialog.style';
import * as PropTypes from 'prop-types';

type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

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
    ref?: React.Ref<HTMLDivElement>;
    onClose?: (e: React.MouseEvent) => void;
}

type LayoutClassProps = 'root' | 'mask' | 'container' | 'paper' | 'header' | 'close' | 'body' | 'footer';

const name = 'Dialog';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

type OptionalRef<T> = React.Ref<T> | null;

function useCombinedRefs<T> (...refs: Array<OptionalRef<T>>): React.Ref<T> {
    const targetRef = React.useRef<T>(null);

    React.useLayoutEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                (ref as React.MutableRefObject<T | null>).current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}

const Dialog: React.FC<IProps> = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
    const { visible, className, keepMounted, title, footer, width, zIndex, top, children, mask, maskClosable, closable, onClose, ...rest } = props;
    const [isDestroy, setIsDestroy] = React.useState(false);
    const classes = useStyles();
    const innerRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
    const classNames = classnames(
        classes.root,
        className
    );

    const style = {
        width,
        marginTop: top
    };

    const closeHandle = (e: React.MouseEvent) => {
        onClose && onClose(e);
    };

    const paperHandleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    React.useLayoutEffect(() => {
        if (keepMounted && innerRef.current) {
            innerRef.current.style.display = visible ? 'block' : 'none';
        }
    }, [visible]);

    React.useEffect(() => {
        return () => {
            if (keepMounted && innerRef.current) {
                setIsDestroy(true);
            }
        };
    }, []);

    if (keepMounted && isDestroy) return null;

    const Component = ReactDOM.createPortal(
        <div
            className={ classNames }
            style={ { zIndex } }
            ref={ combinedRef }>
            { mask ? <div className={ classes.mask } /> : null }
            <div
                className={ classes.container }
                onClick={ e => maskClosable && closeHandle(e) }>
                <div
                    className={ classes.paper }
                    style={ style }
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
        </div>,
        document.body
    );

    if (visible || keepMounted) {
        return Component;
    }
    return null;
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
    onClose: undefined
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
    onClose: PropTypes.func
};

export default Dialog;

