import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = (theme: Theme) => ({
    color: 'rgba(0, 0, 0, 0.87)',
    padding: [6, 16],
    fontSize: theme.typography.fontSize.medium,
    minWidth: 64,
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: 500,
    lineHeight: 1.75,
    borderRadius: 4,
    letterSpacing: 0.4,
    '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '&$disabled': {
        color: 'rgba(0, 0, 0, 0.26)'
    },
    '& .drug-icon': {
        fontSize: 18
    }
});

const contained: Style = () => ({
    boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#e0e0e0',
    '&:hover': {
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        backgroundColor: '#d5d5d5'
    },
    '&$disabled': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
});

const containedPrimary: Style = (theme: Theme) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: '#115293'
    }
});

const containedSecondary: Style = (theme: Theme) => ({
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: '#9a0036'
    }
});

const containedSizeSmall: Style = (theme: Theme) => ({
    padding: [4, 10],
    fontSize: theme.typography.fontSize.small
});

const containedSizeLarge: Style = (theme: Theme) => ({
    padding: [8, 22],
    fontSize: theme.typography.fontSize.large
});

const text: Style = {
    padding: [6, 8]
};

const textPrimary: Style = {
    color: '#1976d2',
    '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.08)'
    }
};

const textSecondary: Style = {
    color: '#dc004e',
    '&:hover': {
        backgroundColor: 'rgba(220, 0, 78, 0.08)'
    }
};

const textSizeSmall: Style = (theme: Theme) => ({
    padding: [4, 5],
    fontSize: theme.typography.fontSize.small
});

const textSizeLarge: Style = (theme: Theme) => ({
    padding: [8, 11],
    fontSize: theme.typography.fontSize.large
});

const outlined: Style = {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    padding: [5, 15],
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    '&$disabled': {
        border: '1px solid rgba(0, 0, 0, 0.26)'
    }
};

const outlinedPrimary: Style = {
    color: '#1976d2',
    border: '1px solid rgba(25, 118, 210, 0.5)',
    '&:hover': {
        border: '1px solid 1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.08)'
    }
};

const outlinedSecondary: Style = {
    color: '#dc004e',
    border: '1px solid rgba(220, 0, 78, 0.5)',
    '&:hover': {
        border: '1px solid rgb(220, 0, 78)',
        backgroundColor: 'rgba(220, 0, 78, 0.08)'
    }
};

const outlinedSizeSmall: Style = (theme: Theme) => ({
    padding: [3, 9],
    fontSize: theme.typography.fontSize.small
});

const outlinedSizeLarge: Style = (theme: Theme) => ({
    padding: [7, 21],
    fontSize: theme.typography.fontSize.large
});

const colorInherit: Style = {
    color: 'inherit',
    borderColor: 'currentColor'
};

const fab: Style = {
    minWidth: 'unset',
    width: 48,
    height: 48,
    borderRadius: '50%',
    padding: 0,
    boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#e0e0e0',
    '&:hover': {
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        backgroundColor: '#d5d5d5'
    },
    '&$disabled': {
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.12)'
    }
};

const fullWidth: Style = {
    width: '100%'
};

const disabled: Style = {};

const icon: Style = {
    ...fab,
    boxShadow: 'none',
    backgroundColor: null,
    '&:hover': null
};

const round: Style = {
    borderRadius: 24
};

const label: Style = {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    '& + .drug-icon': {
        marginLeft: 6
    },
    '.drug-icon + &': {
        marginLeft: 6
    }
};

const loading: Style = {
    cursor: 'default',
    pointerEvents: 'none',
    '&::after': {
        content: `''`,
        position: 'absolute',
        top: '-1px',
        right: '-1px',
        bottom: '-1px',
        left: '-1px',
        zIndex: 1,
        background: '#fff',
        borderRadius: 'inherit',
        opacity: 0.35,
        transition: 'opacity .2s'
    },
    '@global': {
        '@keyframes spin': {
            '100%': { transform: 'rotate(360deg)' }
        }
    },
    '& .drug-icon': {
        display: 'none',

        '&.loading': {
            display: 'block',
            'animation': '$spin 1s infinite linear'
        }
    }
};

export const styles = (theme: Theme): Styles => ({
    root: root(theme),
    contained: contained(),
    containedPrimary: containedPrimary(theme),
    containedSecondary: containedSecondary(theme),
    containedSizeSmall: containedSizeSmall(theme),
    containedSizeLarge: containedSizeLarge(theme),
    text: text,
    textPrimary: textPrimary,
    textSecondary: textSecondary,
    textSizeSmall: textSizeSmall(theme),
    textSizeLarge: textSizeLarge(theme),
    outlined: outlined,
    outlinedPrimary: outlinedPrimary,
    outlinedSecondary: outlinedSecondary,
    outlinedSizeSmall: outlinedSizeSmall(theme),
    outlinedSizeLarge: outlinedSizeLarge(theme),
    colorInherit: colorInherit,
    fab: fab,
    fabPrimary: containedPrimary(theme),
    fabSecondary: containedSecondary(theme),
    round,
    fullWidth,
    disabled,
    label,
    loading
});
