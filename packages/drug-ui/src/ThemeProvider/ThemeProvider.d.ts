import * as React from 'react';
import { Theme } from '../styles/createTheme';
interface ThemeProviderProps {
    theme?: Theme;
    children: React.ReactNode;
}
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
