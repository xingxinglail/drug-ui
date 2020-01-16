import * as React from 'react';
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
    autoHide?: boolean;
    autoHideTime?: number;
    ref?: React.Ref<HTMLDivElement>;
}
declare const ScrollBar: React.FC<ScrollBarProps>;
export default ScrollBar;
