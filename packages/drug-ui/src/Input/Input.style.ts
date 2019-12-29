import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    display: 'inline-flex',
    position: 'relative'
};

const label: Style = () => ({
    display: 'block',
    transformOrigin: 'top left',
    fontSize: 16,
    lineHeight: 1,
    letterSpacing: '0.00938em',
    color: 'rgba(0, 0, 0, 0.54)',
    top: 0,
    left: 0,
    position: 'absolute',
    transform: 'translate(0, 24px) scale(1)',
    transition: 'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms'
});

const labelVisible: Style = (theme: Theme) => ({
    color: theme.palette.primary.main,
    transform: 'translate(0, 1.5px) scale(0.75)',
});

const labelError: Style = {
    color: '#f44336'
};

const inputBase: Style = (theme: Theme) => ({
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'text',
    display: 'inline-flex',
    fontSize: 14,
    marginTop: 16,
    '&:before': {
        left: 0,
        right: 0,
        bottom: 0,
        content: '" "',
        position: 'absolute',
        transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        pointerEvents: 'none'
    },
    '&:after': {
        left: 0,
        right: 0,
        bottom: 0,
        content: '" "',
        position: 'absolute',
        transform: 'scaleX(0)',
        transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        borderBottom: `2px solid ${ theme.palette.primary.main }`,
        pointerEvents: 'none'
    },
    '&:hover': {
        '&:before': {
            borderBottom: '2px solid rgba(0, 0, 0, 0.87)'
        }
    }
});

const inputBaseVisible: Style = () => ({
    '&:before': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.87)'
    },
    '&:after': {
        transform: 'scaleX(1)',
    }
});

const inputBaseError: Style = {
    '&:after': {
        borderColor: '#f44336',
        transform: 'scaleX(1)',
    }
};

const input: Style = () => ({
    font: 'inherit',
    color: 'currentColor',
    width: '100%',
    height: 19,
    padding: [6, 0, 7],
    border: 'none',
    outline: 0,
    '&::placeholder': {
        opacity: 0,
        transition: 'opacity linear 200ms'
    }
});

const inputVisible: Style = {
    '&::placeholder': {
        opacity: 1
    }
};

export const styles = (theme: Theme): Styles => ({
    root,
    label: label(),
    labelVisible: labelVisible(theme),
    labelError,
    inputBase: inputBase(theme),
    inputBaseVisible: inputBaseVisible(),
    inputBaseError,
    input: input(),
    inputVisible
});
