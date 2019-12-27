import { Style, Styles } from 'jss';

const root: Style = {
    display: 'flex',
    flex: 'auto',
    backgroundColor: '#f0f2f5',
    flexDirection: 'column'
};

const hasAside: Style = {
    flexDirection: 'row'
};

export const styles = (): Styles => ({
    root,
    hasAside
});
