export const classes = (...rest: (string | undefined)[]) => {
    return rest.filter(Boolean).join(' ').trim();
};

export const scopedClassMaker = (prefix: string) => {
    return (name?: string) => {
        return [prefix, name].filter(Boolean).join('-');
    };
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
