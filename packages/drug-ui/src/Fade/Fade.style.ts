import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const container: Style = {
    opacity: 0,
    transition: 'opacity .3s cubic-bezier(0.4, 0, 0.2, 1)'
};

const entered: Style = {
    opacity: 1
};

const hidden: Style = {
    visibility: 'hidden'
};

export const styles = (_: Theme): Styles => ({
    container,
    entered,
    hidden
});
