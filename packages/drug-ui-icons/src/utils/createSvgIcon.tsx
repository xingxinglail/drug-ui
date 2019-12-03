import * as React from 'react';
import { SvgIcon, SvgIconProps } from '@drug-ui/core';

const createSvgIcon = (path: React.ReactNode, name: string): typeof SvgIcon => {
    const Component = React.forwardRef<SVGSVGElement, SvgIconProps>((props, ref) => (
        React.createElement(SvgIcon, { ref, ...props }, path)
    ));
    Component.displayName = `${ name }Icon`;
    return Component;
};

export default createSvgIcon;
