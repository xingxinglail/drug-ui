import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import classnames from 'classnames';
import { styles } from './Collapse.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';

interface PropsExtra {
    timeout?: number;
}

export interface CollapseProps extends SimpleSpread<TransitionProps, PropsExtra> {
}

export const name = 'Collapse';

type CollapseClassProps = 'container' | 'entered' | 'hidden';

const useStyles = createUseStyles<CollapseClassProps>(styles, name);

const Collapse: React.FC<CollapseProps> = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
    const { className, style, in: inProp = false, timeout = 300, onEnter, onEntering, onEntered, onExit, onExiting, onExited, children, ...rest } = props;
    const classes = useStyles();
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const handleTransitionEvent = (event: string, node: HTMLElement, isAppearing?: boolean) => {
        if (event === 'onEnter') {
            node.style.height = '0px';
            onEnter && onEnter(node, isAppearing);
        }

        if (event === 'onEntering') {
            const wrapperHeight = wrapperRef.current?.clientHeight || 0;
            node.style.transitionDuration = `${ timeout }ms`;
            node.style.height = `${ wrapperHeight }px`;
            onEntering && onEntering(node, isAppearing);
        }

        if (event === 'onEntered') {
            onEntered && onEntered(node, isAppearing);
        }

        if (event === 'onExit') {
            const wrapperHeight = wrapperRef.current?.clientHeight || 0;
            node.style.height = `${ wrapperHeight }px`;
            onExit && onExit(node);
        }

        if (event === 'onExiting') {
            wrapperRef.current?.clientHeight;
            node.style.transitionDuration = `${ timeout }ms`;
            node.style.height = '0px';
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
                                { [classes.hidden]: state === 'exited' && !inProp },
                                className
                            )
                        }
                        style={ { ...style } }>
                        <div ref={ wrapperRef } style={ { width: '100%' } }>
                            { children }
                        </div>
                    </div>
                )
            }
        </Transition>
    );
});

Collapse.displayName = name;

export default Collapse;
