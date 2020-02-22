import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    position: 'fixed',
    width: 384,
    maxWidth: 'calc(100vw - 32px)',
    zIndex: 1000
};

const topLeft: Style = {
    left: 24
};

const topRight: Style = {
    right: 24
};

const bottomLeft: Style = {
    left: 24
};

const bottomRight: Style = {
    right: 24
};

const notice: Style = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: [16, 24],
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative'
};

const animated: Style = {
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    animationFillMode: 'both'
};

const fadeInLeft: Style = {
    '@global': {
        '@keyframes fadeInLeft': {
            from: {
                opacity: 0,
                transform: 'translate3d(-100%, 0, 0)',
            },
            to: {
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            }
        },
    },
    animationName: '$fadeInLeft'
};

const fadeInRight: Style = {
    '@global': {
        '@keyframes fadeInRight': {
            from: {
                opacity: 0,
                transform: 'translate3d(100%, 0, 0)',
            },
            to: {
                opacity: 1,
                transform: 'translate3d(0, 0, 0)'
            }
        },
    },
    animationName: '$fadeInRight'
};

const fadeOut: Style = {
    '@global': {
        '@keyframes fadeOut': {
            from: {
                opacity: 1,
                maxHeight: 150,
                marginBottom: 16,
                paddingTop: 16,
                paddingBottom: 16
            },
            to: {
                opacity: 0,
                maxHeight: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0
            }
        },
    },
    animationName: '$fadeOut'
};

const message: Style = {
    marginBottom: 8,
    color: 'rgba(0, 0, 0, 0.85)',
    fontSize: 16,
    fontWeight: 500
};

const description: Style = {
    fontSize: 14
};

const btn: Style = {
    float: 'right',
    marginTop: 16
};

const iconWrapper: Style = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 26,
    marginRight: 20
};

const icon: Style = {
    fontSize: 'inherit'
};

const success: Style = {
    color: '#4caf50'
};

const info: Style = {
    color: '#2196f3'
};

const warning: Style = {
    color: '#ff9800'
};

const error: Style = {
    color: '#f44335'
};

const close: Style = {
    position: 'absolute',
    display: 'flex',
    top: 18,
    right: 20,
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.45)',
    'transition': 'color 0.3s ease',
    '&:hover': {
        color: 'rgba(0, 0, 0, 0.67)'
    }
};

const closeIcon: Style = {
    fontSize: 18
};

export const styles = (_: Theme): Styles => ({
    root,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    animated,
    fadeInLeft,
    fadeInRight,
    fadeOut,
    notice,
    message,
    description,
    btn,
    iconWrapper,
    icon,
    success,
    info,
    warning,
    error,
    close,
    closeIcon
});
