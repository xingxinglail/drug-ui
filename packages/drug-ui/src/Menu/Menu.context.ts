import { createContext } from 'react';
import { Index } from './Menu';

interface MenuContext {
    handleOpenChange: (index: Index) => void;
}

export const MenuContext = createContext<MenuContext>({ handleOpenChange () {} });
