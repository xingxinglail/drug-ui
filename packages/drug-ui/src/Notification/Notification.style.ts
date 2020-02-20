import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    position: 'fixed',
    zIndex: 1000
};

const topLeft: Style = {
    top: 24,
    left: 24
};

const topRight: Style = {
    top: 24,
    right: 24
};

const bottomLeft: Style = {
    bottom: 24,
    left: 24
};

const bottomRight: Style = {
    bottom: 24,
    right: 24
};

const notice: Style = {
    width: 300,
    marginBottom: 16,
    padding: [16, 24],
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff'
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
    description
});
