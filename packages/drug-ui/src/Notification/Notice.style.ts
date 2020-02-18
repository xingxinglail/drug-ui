import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    width: 300,
    height: 100,
    marginBottom: 20,
    boxShadow: '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)'
};

export const styles = (_: Theme): Styles => ({
    root
});
