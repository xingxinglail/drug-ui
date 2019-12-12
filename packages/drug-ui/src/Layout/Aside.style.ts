import { Style, Styles } from 'jss';
import { Theme } from '@drug-ui/core/styles';

const root: Style = {
    position: 'relative',
    backgroundColor: '#001529'
};

export const styles = (_: Theme): Styles => ({
    root,
});
