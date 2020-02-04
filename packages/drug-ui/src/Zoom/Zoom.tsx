import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { SimpleSpread } from '..';

interface PropsExtra {
    timeout?: number | { enter?: number, exit?: number };
}

export interface ZoomProps extends SimpleSpread<TransitionProps, PropsExtra> {
    children: React.ReactElement;
}

export const name = 'Zoom';

const Zoom: React.FC<ZoomProps> = React.forwardRef<HTMLDivElement, ZoomProps>((props, ref) => {
    const {
        style,
        in: inProp = false,
        timeout = {
            enter: 225,
            exit: 195
        },
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        children,
        ...rest
    } = props;

    const handleTransitionEvent = (event: string, node: HTMLElement, isAppearing?: boolean) => {
        if (event === 'onEnter') {
            node.style.transform = 'scale(0)';
            onEnter && onEnter(node, isAppearing);
        }

        if (event === 'onEntering') {
            node.offsetTop;
            node.style.transform = 'scale(1)';
            node.style.transition = `transform ${ typeof timeout === 'number' ? timeout : timeout.enter }ms cubic-bezier(0.4, 0, 0.2, 1)`;
            onEntering && onEntering(node, isAppearing);
        }

        if (event === 'onEntered') {
            onEntered && onEntered(node, isAppearing);
        }

        if (event === 'onExit') {
            node.style.transform = 'scale(1)';
            onExit && onExit(node);
        }

        if (event === 'onExiting') {
            node.style.transform = 'scale(0)';
            node.style.transition = `transform ${ typeof timeout === 'number' ? timeout : timeout.exit }ms cubic-bezier(0.4, 0, 0.2, 1)`;
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
                (state: string, childProps: any) => {
                    return React.cloneElement(children, {
                        style: {
                            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                            ...style,
                            ...children.props.style
                        },
                        ...childProps,
                        ref
                    })
                }
            }
        </Transition>
    );
});

Zoom.displayName = name;

export default Zoom;
