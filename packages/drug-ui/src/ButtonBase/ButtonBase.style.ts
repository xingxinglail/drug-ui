import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    color: 'inherit',
    border: 0,
    cursor: 'pointer',
    margin: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 0,
    padding: 0,
    position: 'relative',
    userSelect: 'none',
    borderRadius: 0,
    verticalAlign: 'middle',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '-moz-appearance': 'none',
    '-webkit-appearance': 'none',
    '-webkit-tap-highlight-color': 'transparent',
    '&$disabled': {
        cursor: 'default',
        pointerEvents: 'none'
    }
};

const disabled: Style = {};

export const styles = (_: Theme): Styles => ({
    root: root,
    disabled
});
