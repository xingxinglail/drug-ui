import * as React from 'react';

export interface JSX {
    type: keyof React.ReactSVG
    props?: React.ClassAttributes<SVGElement> & React.SVGAttributes<SVGElement> | null
    children: JSX[]
}

function createElement (
    jsx: JSX,
    otherProps: React.HTMLAttributes<SVGElement> & React.RefAttributes<SVGElement> = {}
): React.ReactSVGElement {
    const { type, props, children } = jsx;
    const childrens = children.map(child => {
        return React.createElement(child.type, child.props)
    });
    return React.createElement(type, { ...props, ...otherProps }, ...childrens);
}

function createIcon (
    jsx: JSX,
    componentName: string
): React.ForwardRefExoticComponent<React.RefAttributes<SVGElement>> {
    const Icon = React.forwardRef<SVGElement>(
        (props: React.HTMLAttributes<SVGElement>, ref): React.ReactElement => {
            const style = {
                width: '1em',
                height: '1em',
                display: 'inline-block',
                fontSize: 'inherit',
                color: 'inherit',
                fill: 'currentColor',
                verticalAlign: 'middle'
            };
            return createElement(jsx, { style, ref, ...props });
        }
    );
    Icon.displayName = `RemixIcon${ componentName }`;
    return Icon;
}

export default createIcon;
