import { createContext, Ref } from 'react';
import { Index } from './Menu';

interface MenuContext {
    openIndexes: any[];
    activeSelectedIndex: undefined | Index;
    handleOpenChange: (index: Index) => void;
    handleSelectChange: (index: Index) => void;
}

export const MenuContext = createContext<MenuContext>({
    openIndexes: [],
    activeSelectedIndex: undefined,
    handleOpenChange () {},
    handleSelectChange () {}
});
