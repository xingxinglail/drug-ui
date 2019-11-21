import * as React from 'react';
export interface JSX {
    type: keyof React.ReactSVG;
    props?: (React.ClassAttributes<SVGElement> & React.SVGAttributes<SVGElement>) | null;
    children: JSX[];
}
declare function createIcon(jsx: JSX, componentName: string): React.ForwardRefExoticComponent<React.RefAttributes<SVGElement>>;
export default createIcon;
