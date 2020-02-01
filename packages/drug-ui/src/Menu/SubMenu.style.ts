import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    listStyle: 'none'
};

const subMenuTitle: Style = {
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
};

export const styles = (_: Theme): Styles => ({
    root,
    subMenuTitle
});
