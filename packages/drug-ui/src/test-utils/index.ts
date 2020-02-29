export { default as Wrapper } from './Wrapper';
export { getClasses } from './getClasses';

export const wait = (delay = 50) => {
    return new Promise(resolve => setTimeout(resolve, delay));
};
