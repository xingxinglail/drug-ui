import { Palette, PaletteOptions } from './createPalette';
export interface ThemeOptions {
    palette?: PaletteOptions;
}
export interface Theme {
    palette: Palette;
}
declare function createTheme(theme: ThemeOptions): Theme;
export default createTheme;
