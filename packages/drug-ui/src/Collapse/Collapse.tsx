import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import classnames from 'classnames';
import { styles } from './Collapse.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';

interface PropsExtra {
    timeout?: number | { enter?: number, exit?: number };
}

export interface CollapseProps extends SimpleSpread<TransitionProps, PropsExtra> {
    collapsedHeight?: string | number;
}

export const name = 'Collapse';

type CollapseClassProps = 'container' | 'entered' | 'hidden' | 'wrapper' | 'innerWrapper';

const useStyles = createUseStyles<CollapseClassProps>(styles, name);

const Collapse: React.FC<CollapseProps> = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
    const { className, style, collapsedHeight: collapsedHeightProp = '0px', in: inProp = false, timeout = 300, onEnter, onEntering, onEntered, onExit, onExiting, onExited, children, ...rest } = props;
    const classes = useStyles();
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const collapsedHeight = typeof collapsedHeightProp === 'number' ? `${collapsedHeightProp}px` : collapsedHeightProp;

    const handleTransitionEvent = (event: string, node: HTMLElement, isAppearing?: boolean) => {
        if (event === 'onEnter') {
            node.style.height = collapsedHeight;
            onEnter && onEnter(node, isAppearing);
        }

        if (event === 'onEntering') {
            const wrapperHeight = wrapperRef.current?.clientHeight || 0;
            node.style.transitionDuration = `${ typeof timeout === 'number' ? timeout : timeout.enter }ms`;
            node.style.height = `${ wrapperHeight }px`;
            onEntering && onEntering(node, isAppearing);
        }

        if (event === 'onEntered') {
            node.style.height = 'auto';
            onEntered && onEntered(node, isAppearing);
        }

        if (event === 'onExit') {
            const wrapperHeight = wrapperRef.current?.clientHeight || 0;
            node.style.height = `${ wrapperHeight }px`;
            onExit && onExit(node);
        }

        if (event === 'onExiting') {
            wrapperRef.current?.clientHeight;
            node.style.transitionDuration = `${ typeof timeout === 'number' ? timeout : timeout.exit }ms`;
            node.style.height = collapsedHeight;
            onExiting && onExiting(node);
        }

        if (event === 'onExited') {
            onExited && onExited(node);
        }
    };

    return (
        <Transition
            in={ inProp }
            timeout={ timeout }
            onEnter={ (node, isAppearing) => handleTransitionEvent('onEnter', node, isAppearing) }
            onEntering={ (node, isAppearing) => handleTransitionEvent('onEntering', node, isAppearing) }
            onEntered={ (node, isAppearing) => handleTransitionEvent('onEntered', node, isAppearing) }
            onExit={ (node) => handleTransitionEvent('onExit', node) }
            onExiting={ (node) => handleTransitionEvent('onExiting', node) }
            onExited={ (node) => handleTransitionEvent('onExited', node) }
            { ...rest }>
            {
                state => (
                    <div
                        ref={ ref }
                        className={
                            classnames(
                                classes.container,
                                { [classes.entered]: state === 'entered' },
                                { [classes.hidden]: state === 'exited' && !inProp && collapsedHeight === '0px' },
                                className
                            )
                        }
                        style={ { minHeight: collapsedHeight, ...style } }>
                        <div ref={ wrapperRef } className={ classes.wrapper }>
                            <div className={ classes.innerWrapper }>
                                { children }
                            </div>
                        </div>
                    </div>
                )
            }
        </Transition>
    );
});

Collapse.displayName = name;

if (process.env.NODE_ENV !== 'production') {
    // @ts-ignore
    Collapse.useStyles = useStyles;
}

export default Collapse;
