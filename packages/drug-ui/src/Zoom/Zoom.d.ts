import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { SimpleSpread } from '..';
interface PropsExtra {
    timeout?: number | {
        enter?: number;
        exit?: number;
    };
}
export interface ZoomProps extends SimpleSpread<TransitionProps, PropsExtra> {
    children: React.ReactElement;
}
export declare const name = "Zoom";
declare const Zoom: React.FC<ZoomProps>;
export default Zoom;
