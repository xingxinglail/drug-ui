import { Style, Styles } from 'jss';
import { Theme } from '../styles';

const root: Style = (theme: Theme) => ({
    overflow: 'hidden',
    position: 'relative',
    width: 'inherit',
    height: 'inherit'
});

const track: Style = {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none'
};

const trackDragging: Style = {
    pointerEvents: 'all'
};

const trackVertical: Style = {
    top: 0,
    bottom: 0,
    right: 0,
    width: 11,
    '& > div:before': {
        top: 2,
        bottom: 2
    }
};

const scrollbar: Style = {
    position: 'relative',
    '&:before': {
        content: '" "',
        position: 'absolute',
        backgroundColor: '#000',
        borderRadius: 7,
        left: 2,
        right: 2,
        opacity: 0.5
    }
};

const scrollbarHide: Style = {
    opacity: 0,
    transition: 'opacity .3s ease'
};

const scrollbarVertical: Style = {
    minHeight: 10
};

const trackHorizontal: Style = {
    left: 0,
    right: 0,
    bottom: 0,
    height: 11,
    '& > div:before': {
        top: 2,
        bottom: 2
    }
};

const scrollbarHorizontal: Style = {
    minWidth: 10,
    height: '100%'
};

const contentWrapper: Style = {
    overflow: 'scroll',
    height: '100%',
    '&::-webkit-scrollbar': {
        width: 0,
        height: 0
    }
};

export const styles = (theme: Theme): Styles => ({
    root: root(theme),
    track,
    trackDragging,
    trackVertical,
    scrollbar,
    scrollbarHide,
    scrollbarVertical,
    trackHorizontal,
    scrollbarHorizontal,
    contentWrapper
});
