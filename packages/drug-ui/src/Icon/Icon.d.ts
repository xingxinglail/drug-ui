import * as React from 'react';
import './style/index.scss';
import './importIcons';
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    name: string;
    className?: string;
    ref?: React.Ref<SVGSVGElement>;
}
declare const Icon: React.FC<IconProps>;
export default Icon;
