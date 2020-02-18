import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    position: 'fixed',
    top: 24,
    right: 0,
    zIndex: 1000
};

export const styles = (_: Theme): Styles => ({
    root
});
