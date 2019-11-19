import createPalette, { Palette, PaletteOptions } from './createPalette';

export interface ThemeOptions {
    palette?: PaletteOptions;
}

export interface Theme {
    palette: Palette;
}

function createTheme (theme: ThemeOptions): Theme {
    const {
        palette: paletteInput = {}
    } = theme;

    const palette = createPalette(paletteInput);

    return { palette };
}

export default createTheme;
