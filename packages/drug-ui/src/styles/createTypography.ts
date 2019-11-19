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

const createTypography = (typographyOptions: TypographyOptions): Typography => {
    const {
        fontSize = {
            small: 13,
            medium: 14,
            large: 15
        }
    } = typographyOptions;

    return { fontSize };
};

export default createTypography;
