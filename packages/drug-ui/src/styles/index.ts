import { Style } from 'jss';
import { createUseStyles as createUseStylesDefault } from '@drug-ui/styles';
import { Theme } from './createTheme';

export * from './createTheme';

let index = -1e9;

export function createUseStyles<C extends string> (styles: (theme: Theme) => Record<C, Style | string>, name: string) {
    index += 1;
    return createUseStylesDefault<Theme, C>(styles, { name, index });
}
