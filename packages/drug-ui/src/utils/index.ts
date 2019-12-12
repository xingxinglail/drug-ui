export const capitalize = (str: string): string => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isNumeric = (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
