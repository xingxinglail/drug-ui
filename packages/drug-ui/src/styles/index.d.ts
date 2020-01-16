import { Style } from 'jss';
import { Theme } from './createTheme';
export * from './createTheme';
export declare function createUseStyles<C extends string>(styles: (theme: Theme) => Record<C, Style | string>, name: string): (data?: any) => Record<C, string>;
