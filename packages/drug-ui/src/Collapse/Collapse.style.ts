import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const container: Style = {
    overflow: 'hidden',
    height: 0,
    transition: 'height .3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const entered: Style = {
    overflow: 'visible',
    height: 'auto'
};

const hidden: Style = {
    overflow: 'hidden'
};

export const styles = (_: Theme): Styles => ({
    container,
    entered,
    hidden
});
