import * as React from 'react';
import { SimpleSpread } from '..';
import { Index } from './Menu';
interface PropsExtra {
    title?: string | React.ReactNode;
}
export interface SubMenuProps extends SimpleSpread<React.HTMLAttributes<HTMLLIElement>, PropsExtra> {
    index: Index;
    onTitleClick?: (data: {
        index: string | number;
        domEvent: React.MouseEvent;
    }) => void;
    ref?: React.Ref<HTMLLIElement>;
}
declare type ClassProps = 'root' | 'subMenuTitle';
export declare const useStyles: (data?: any) => Record<ClassProps, string>;
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
