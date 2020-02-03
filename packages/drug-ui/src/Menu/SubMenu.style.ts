import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    listStyle: 'none'
};

const subMenuTitle: Style = {
    position: 'relative',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
};

export const styles = (_: Theme): Styles => ({
    root,
    subMenuTitle
});
