import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    display: 'flex',
    flex: 'auto',
    backgroundColor: '#f0f2f5',
    flexDirection: 'column',
    fontSize: 14
};

const hasAside: Style = {
    flexDirection: 'row'
};

export const styles = (_: Theme): Styles => ({
    root,
    hasAside
});
