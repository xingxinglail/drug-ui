import * as React from 'react';
import { AsideProps } from './Aside';
export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
}
export interface LayoutComponent extends React.ForwardRefExoticComponent<LayoutProps & React.RefAttributes<HTMLDivElement>> {
    Header: React.FC<LayoutProps>;
    Content: React.FC<LayoutProps>;
    Aside: React.FC<AsideProps>;
    Footer: React.FC<LayoutProps>;
}
declare const Layout: LayoutComponent;
export default Layout;
