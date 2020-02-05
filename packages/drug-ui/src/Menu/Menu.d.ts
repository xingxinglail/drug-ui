import * as React from 'react';
import { SubMenuProps } from './SubMenu';
import { ItemProps } from './Item';
export declare type Index = number | string;
export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
    defaultOpenIndexes?: any[];
    openIndexes?: any[];
    defaultSelectedIndex?: Index;
    selectedIndex?: Index;
    onOpenChange?: (indexes: any[]) => void;
    onSelectChange?: (index: Index) => void;
    ref?: React.Ref<HTMLUListElement>;
}
export declare const useStyles: (data?: any) => Record<"root", string>;
export interface MenuComponent extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLUListElement>> {
    SubMenu: React.FC<SubMenuProps>;
    Item: React.FC<ItemProps>;
}
declare const Menu: MenuComponent;
export default Menu;
