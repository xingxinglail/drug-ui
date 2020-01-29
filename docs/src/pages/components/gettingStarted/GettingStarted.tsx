import * as React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';
import { createUseStyles } from '@drug-ui/styles';
const req = require.context('./components', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
    '!raw-loader!./components',
    false,
    /\.(js|tsx)$/,
);

const useStyles = createUseStyles({
    root: {
        padding: 24
    }
}, { name: 'Page' });

const Pages = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <MarkdownDocs req={ req } reqSource={reqSource} reqPrefix="pages/gettingStarted/components" />
        </div>
    );
};

export default Pages;
