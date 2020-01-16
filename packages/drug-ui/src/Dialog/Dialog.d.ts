import * as React from 'react';
import { SimpleSpread } from '..';
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
    transitionDuration?: number | {
        enter?: number;
        exit?: number;
    };
    ref?: React.Ref<HTMLDivElement>;
    onClose?: (e: React.MouseEvent) => void;
    onEnter?: (e: HTMLElement) => void;
    onEntering?: (e: HTMLElement) => void;
    onEntered?: (e: HTMLElement) => void;
    onExit?: (e: HTMLElement) => void;
    onExiting?: (e: HTMLElement) => void;
    onExited?: (e: HTMLElement) => void;
}
declare const Dialog: React.FC<IProps>;
export default Dialog;
