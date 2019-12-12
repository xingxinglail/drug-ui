import { Style, Styles } from 'jss';
import { Theme } from '@drug-ui/core/styles';

const root: Style = {
    padding: [24, 50],
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.65)',
    backgroundColor: '#f0f2f5'
};

export const styles = (_: Theme): Styles => ({
    root,
});
