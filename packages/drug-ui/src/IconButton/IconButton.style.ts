import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = () => ({
    width: 56,
    height: 56,
    padding: 0,
    fontSize: 24,
    boxSizing: 'border-box',
    textAlign: 'center',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '&$disabled': {
        color: 'rgba(0, 0, 0, 0.26)',
        backgroundColor: 'transparent'
    }
});

const primary: Style = (theme: Theme) => ({
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.08)'
    }
});

const secondary: Style = (theme: Theme) => ({
    color: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: 'rgba(220, 0, 78, 0.08)'
    }
});

const colorInherit: Style = {
    color: 'inherit'
};

const sizeSmall: Style = {
    width: 40,
    height: 40
};

const sizeMedium: Style = {
    width: 48,
    height: 48
};

const disabled: Style = {};

export const styles = (theme: Theme): Styles => ({
    root: root(theme),
    primary: primary(theme),
    secondary: secondary(theme),
    sizeSmall,
    sizeMedium,
    colorInherit,
    disabled
});
