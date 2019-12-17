import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const fixed = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
};

const root: Style = fixed;

const container: Style = {
    ...fixed,
    overflow: 'auto'
};

const paper: Style = {
    position: 'relative',
    margin: '0 auto 50px',
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)'
};

const header: Style = {
    flex: '0 0 auto',
    margin: 0,
    padding: [16, 24],
    '& h2': {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: '0.0075em'
    }
};

const close: Style = {
    position: 'absolute',
    top: 12,
    right: 12,
    '& svg': {
        fontSize: 14,
        color: '#9e9e9e'
    }
};

const body: Style = {
    padding: [16, 24],
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
};

const footer: Style = {
    display: 'flex',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-end'
};

const mask: Style = {
    ...fixed,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: -1
};

export const styles = (_: Theme): Styles => ({
    root,
    container,
    paper,
    header,
    body,
    close,
    footer,
    mask
});
