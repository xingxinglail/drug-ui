import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import classnames from 'classnames';
import { styles } from './Fade.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';

interface PropsExtra {
    timeout?: number | { enter?: number, exit?: number };
}

export interface FadeProps extends SimpleSpread<TransitionProps, PropsExtra> {
}

export const name = 'Fade';

type FadeClassProps = 'container' | 'entered' | 'hidden';

const useStyles = createUseStyles<FadeClassProps>(styles, name);

const Fade: React.FC<FadeProps> = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
    const {
        className, style, in: inProp = false, timeout = {
            enter: 225,
            exit: 195
        }, onEnter, onEntering, onEntered, onExit, onExiting, onExited, children, ...rest
    } = props;
    const classes = useStyles();

    const handleTransitionEvent = (event: string, node: HTMLElement, isAppearing?: boolean) => {
        if (event === 'onEnter') {
            node.style.opacity = '0';
            onEnter && onEnter(node, isAppearing);
        }

        if (event === 'onEntering') {
            node.scrollTop;
            node.style.opacity = '1';
            node.style.transitionDuration = `${ typeof timeout === 'number' ? timeout : timeout.enter }ms`;
            onEntering && onEntering(node, isAppearing);
        }

        if (event === 'onEntered') {
            onEntered && onEntered(node, isAppearing);
        }

        if (event === 'onExit') {
            node.style.opacity = '1';
            onExit && onExit(node);
        }

        if (event === 'onExiting') {
            node.style.opacity = '0';
            node.style.transitionDuration = `${ typeof timeout === 'number' ? timeout : timeout.exit }ms`;
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
                        { children }
                    </div>
                )
            }
        </Transition>
    );
});

Fade.displayName = name;

export default Fade;
