
export namespace PropTypes {
    export type Color = 'inherit' | 'primary' | 'secondary' | 'default';
    export type Size = 'small' | 'medium' | 'large';
}

export type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

export { default as ThemeProvider } from './ThemeProvider';
export { default as ButtonBase } from './ButtonBase';
export { default as ButtonGroup } from './ButtonGroup';
export { default as Button } from './Button';
export { default as Fab } from './Fab';
export { default as IconButton } from './IconButton';
export { default as SvgIcon, SvgIconProps } from './SvgIcon';
export { default as Layout } from './Layout';
export { default as Dialog } from './Dialog';
export { default as Form } from './Form';
export { default as FormField } from './FormField';
export { default as Input } from './Input';
export { default as ScrollBar } from './ScrollBar';
export { default as Menu } from './Menu';
export { default as Collapse } from './Collapse';
export { default as Fade } from './Fade';
