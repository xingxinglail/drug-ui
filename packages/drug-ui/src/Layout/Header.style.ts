import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = {
    height: 64,
    lineHeight: '64px',
    padding: [0, 50],
    backgroundColor: '#001529'
};

export const styles = (_: Theme): Styles => ({
    root
});
