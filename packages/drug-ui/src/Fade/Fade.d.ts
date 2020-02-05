import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { SimpleSpread } from '..';
interface PropsExtra {
    timeout?: number | {
        enter?: number;
        exit?: number;
    };
}
export interface FadeProps extends SimpleSpread<TransitionProps, PropsExtra> {
}
export declare const name = "Fade";
declare const Fade: React.FC<FadeProps>;
export default Fade;
