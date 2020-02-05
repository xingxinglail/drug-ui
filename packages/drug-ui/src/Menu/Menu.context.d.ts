/// <reference types="react" />
import { Index } from './Menu';
interface MenuContext {
    openIndexes: any[];
    activeSelectedIndex: undefined | Index;
    handleOpenChange: (index: Index) => void;
    handleSelectChange: (index: Index) => void;
}
export declare const MenuContext: import("react").Context<MenuContext>;
export {};
