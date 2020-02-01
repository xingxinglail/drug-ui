import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    listStyle: 'none',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
};

const label: Style = {
    display: 'flex',
    width: '100%'
};

const active: Style = (theme: Theme) => ({
    color: theme.palette.primary.main
});

export const styles = (theme: Theme): Styles => ({
    root,
    label,
    active: active(theme)
});
