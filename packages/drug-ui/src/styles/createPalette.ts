export interface SimplePaletteColorOptions {
    main?: string;
    contrastText?: string;
}

export interface PaletteOptions {
    primary?: SimplePaletteColorOptions;
    secondary?: SimplePaletteColorOptions
}

export interface Palette {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions
}

const createPalette = (paletteOptions: PaletteOptions): Palette => {
    const {
        primary = {
            main: '#1976d2',
            contrastText: '#fff'
        },
        secondary = {
            main: '#dc004e',
            contrastText: '#fff'
        }
    } = paletteOptions;

    return { primary, secondary };
};

export default createPalette;
