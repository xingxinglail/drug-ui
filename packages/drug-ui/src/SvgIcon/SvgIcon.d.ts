import * as React from 'react';
export declare type Color = 'inherit' | 'primary' | 'secondary' | 'disabled';
export declare type FontSize = 'inherit' | 'default' | 'small' | 'large';
export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
    color?: Color;
    fontSize?: FontSize;
    htmlColor?: string;
    titleAccess?: string;
    viewBox?: string;
    ref?: React.Ref<SVGSVGElement>;
}
declare const SvgIcon: React.FC<SvgIconProps>;
export default SvgIcon;
