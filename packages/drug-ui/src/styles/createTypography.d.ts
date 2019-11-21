export interface SimpleTypographyOptions {
    small?: number;
    medium?: number;
    large?: number;
}
export interface TypographyOptions {
    fontSize?: SimpleTypographyOptions;
}
export interface Typography {
    fontSize: SimpleTypographyOptions;
}
declare const createTypography: (typographyOptions: TypographyOptions) => Typography;
export default createTypography;
