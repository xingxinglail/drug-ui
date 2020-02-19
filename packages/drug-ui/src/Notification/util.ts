export const getNodeFromSelector = (selector: string | HTMLElement): HTMLElement | null => {
    return typeof selector === 'string' ? document.querySelector(selector) : selector;
};
