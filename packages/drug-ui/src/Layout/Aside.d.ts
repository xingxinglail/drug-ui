import * as React from 'react';
import { LayoutProps } from './Layout';
export interface AsideProps extends LayoutProps {
    width?: number | string;
}
declare const Aside: React.FC<AsideProps>;
export default Aside;
