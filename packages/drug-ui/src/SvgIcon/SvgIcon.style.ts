import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = () => ({
    fill: 'currentColor',
    width: '1em',
    height: '1em',
    fontSize: 20,
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    userSelect: 'none'
});

const colorPrimary: Style = (theme: Theme) => ({
    color: theme.palette.primary.main
});

const colorSecondary: Style = (theme: Theme) => ({
    color: theme.palette.secondary.main
});

const colorDisabled: Style = {
    color: 'rgba(0, 0, 0, 0.26)'
};

const fontSizeInherit: Style = {
    fontSize: 'inherit'
};

const fontSizeSmall: Style = {
    fontSize: 20
};

const fontSizeLarge: Style = {
    fontSize: 35
};

export const styles = (theme: Theme): Styles => ({
    root: root(theme),
    colorPrimary: colorPrimary(theme),
    colorSecondary: colorSecondary(theme),
    colorDisabled,
    fontSizeInherit,
    fontSizeSmall,
    fontSizeLarge
});
