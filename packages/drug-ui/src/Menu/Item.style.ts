import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    position: 'relative',
    listStyle: 'none',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
};

const label: Style = {
    display: 'flex',
    width: '100%'
};

export const styles = (_: Theme): Styles => ({
    root,
    label
});
