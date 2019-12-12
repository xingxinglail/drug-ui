import { Style, Styles } from 'jss';
import { Theme } from '@drug-ui/core/styles';

const root: Style = {
    display: 'flex',
    flex: 'auto',
    backgroundColor: '#f0f2f5',
    flexDirection: 'column'
};

const hasAside: Style = {
    flexDirection: 'row'
};

export const styles = (_: Theme): Styles => ({
    root,
    hasAside
});
