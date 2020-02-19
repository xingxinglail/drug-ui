import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    width: 300,
    marginBottom: 16,
    padding: [16, 24],
    borderRadius: 4,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
};

const animated: Style = {
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    animationFillMode: 'both'
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

export const styles = (_: Theme): Styles => ({
    root,
    animated,
    fadeInRight,
    fadeOut
});
