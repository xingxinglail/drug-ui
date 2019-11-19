import createPalette, { Palette, PaletteOptions } from './createPalette';
import createTypography, { Typography, TypographyOptions } from './createTypography';

export interface ThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions;
}

export interface Theme {
    palette: Palette;
    typography: Typography;
}

function createTheme (theme: ThemeOptions): Theme {
    const {
        palette: paletteInput = {},
        typography: typographyInput = {}
    } = theme;

    const palette = createPalette(paletteInput);
    const typography = createTypography(typographyInput);

    return { palette, typography };
}

export default createTheme;
