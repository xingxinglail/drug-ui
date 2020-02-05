import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { SimpleSpread } from '..';
interface PropsExtra {
    timeout?: number | {
        enter?: number;
        exit?: number;
    };
}
export interface CollapseProps extends SimpleSpread<TransitionProps, PropsExtra> {
    collapsedHeight?: string | number;
}
export declare const name = "Collapse";
declare const Collapse: React.FC<CollapseProps>;
export default Collapse;
