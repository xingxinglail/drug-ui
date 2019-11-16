export const classes = (...rest: (string | undefined)[]) => {
    return rest.filter(Boolean).join(' ').trim();
};

export const scopedClassMaker = (prefix: string) => {
    return (name?: string) => {
        return [prefix, name].filter(Boolean).join('-');
    };
};
