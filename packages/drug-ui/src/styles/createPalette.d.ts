export interface SimplePaletteColorOptions {
    main?: string;
    contrastText?: string;
}
export interface PaletteOptions {
    primary?: SimplePaletteColorOptions;
    secondary?: SimplePaletteColorOptions;
}
export interface Palette {
    primary: SimplePaletteColorOptions;
    secondary: SimplePaletteColorOptions;
}
declare const createPalette: (paletteOptions: PaletteOptions) => Palette;
export default createPalette;
