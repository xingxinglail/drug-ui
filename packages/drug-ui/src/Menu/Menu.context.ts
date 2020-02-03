import { createContext } from 'react';
import { Index } from './Menu';

interface MenuContext {
    activeSelectedIndex: undefined | Index;
    handleOpenChange: (index: Index) => void;
    handleSelectChange: (index: Index) => void;
}

export const MenuContext = createContext<MenuContext>({ activeSelectedIndex: undefined, handleOpenChange () {}, handleSelectChange () {} });
