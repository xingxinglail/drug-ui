import * as React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';
import markdown from './index.md';

export default function Page () {
    return <MarkdownDocs markdown={ markdown } />;
}
