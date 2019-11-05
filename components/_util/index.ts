export const classes = (...rest: (string | undefined)[]) => {
    return rest.filter(Boolean).join(' ').trim();
};
