import { Palette, PaletteOptions } from './createPalette';
import { Typography, TypographyOptions } from './createTypography';
export interface ThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions;
}
export interface Theme {
    palette: Palette;
    typography: Typography;
}
declare function createTheme(theme: ThemeOptions): Theme;
export default createTheme;
