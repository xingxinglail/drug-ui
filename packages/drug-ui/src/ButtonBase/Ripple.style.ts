import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    '@global': {
        '@keyframes drug-ripple-enter': {
            '0%': {
                opacity: 0.1,
                transform: 'scale(0)'
            },

            '100%': {
                opacity: 0.3,
                transform: 'scale(1)'
            }
        },
        '@keyframes drug-ripple-leave': {
            '0%': {
                opacity: 1
            },

            '100%': {
                opacity: 0
            }
        }
    },
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 0,
    overflow: 'hidden',
    borderRadius: 'inherit'
};

const visible: Style = {
    position: 'absolute',
    animation: '$drug-ripple-enter 550ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
};

const child: Style = {
    display: 'block',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor'
};

const childLeaving: Style = {
    animation: '$drug-ripple-leave 550ms cubic-bezier(0.4, 0, 0.2, 1) forwards'
};

export const styles = (_: Theme): Styles => ({
    root,
    visible,
    child,
    childLeaving
});
