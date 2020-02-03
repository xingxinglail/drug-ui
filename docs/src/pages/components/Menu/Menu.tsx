import * as React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';

const req = require.context('./components', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
    '!raw-loader!./components',
    false,
    /\.(js|tsx)$/,
);

const Pages = () => {
    return (
        <div>
            <MarkdownDocs req={ req } reqSource={reqSource} reqPrefix="pages/Menus/components" />
        </div>
    );
};

export default Pages;
