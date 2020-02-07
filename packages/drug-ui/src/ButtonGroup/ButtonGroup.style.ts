import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = (theme: Theme) => ({
    display: 'inline-flex',
    borderRadius: 4
});

const grouped: Style = {
    '&:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    '&:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
};

const contained: Style = {
    boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0px rgba(0, 0, 0, 0.14), 0 1px 5px 0px rgba(0, 0, 0, 0.12)'
};

const groupedContained: Style = {
    boxShadow: 'none',
    '&:not(:last-child)': {
        borderRight: '1px solid #bdbdbd'
    }
};

const groupedContainedPrimary: Style = {
    '&:not(:last-child)': {
        borderColor: '#35215e'
    }
};

const groupedContainedSecondary: Style = {
    '&:not(:last-child)': {
        borderColor: '#c51162'
    }
};

const groupedOutlined: Style = {
    '&:not(:first-child)': {
        marginLeft: -1
    },
    '&:not(:last-child)': {
        borderRightColor: 'transparent'
    }
};

const groupedOutlinedPrimary: Style = (theme: Theme) => ({
    '&:hover': {
        borderColor: theme.palette.primary.main
    }
});

const groupedOutlinedSecondary: Style = (theme: Theme) => ({
    '&:hover': {
        borderColor: theme.palette.secondary.main
    }
});

const groupedText: Style = {
    '&:not(:last-child)': {
        borderRight: '1px solid rgba(0, 0, 0, 0.23)'
    }
};

const groupedTextPrimary: Style = {
    '&:not(:last-child)': {
        borderColor: 'rgba(64, 52, 111, 0.5)'
    }
};

const groupedTextSecondary: Style = {
    '&:not(:last-child)': {
        borderColor: 'rgba(245, 0, 87, 0.5)'
    }
};

export const styles = (theme: Theme): Styles => ({
    root: root(theme),
    grouped,
    contained,
    groupedContained,
    groupedContainedPrimary,
    groupedContainedSecondary,
    groupedOutlined,
    groupedOutlinedPrimary: groupedOutlinedPrimary(theme),
    groupedOutlinedSecondary: groupedOutlinedSecondary(theme),
    groupedText,
    groupedTextPrimary,
    groupedTextSecondary
});
