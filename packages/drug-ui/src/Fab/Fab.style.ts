import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = (theme: Theme) => ({
    width: 56,
    height: 56,
    padding: 0,
    fontSize: theme.typography.fontSize.large,
    minWidth: 0,
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    boxSizing: 'border-box',
    minHeight: 36,
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    '&:hover': {
        textDecoration: 'none',
        backgroundColor: '#d5d5d5'
    },
    '&$disabled': {
        color: 'rgba(0, 0, 0, 0.26)',
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
});

const primary: Style = (theme: Theme) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: '#115293'
    }
});

const secondary: Style = (theme: Theme) => ({
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: '#9a0036'
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
