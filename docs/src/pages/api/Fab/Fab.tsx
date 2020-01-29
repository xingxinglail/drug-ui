import * as React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';
// @ts-ignore
import markdown from './fab.md';

export default function Page () {
    return <MarkdownDocs markdown={ markdown } />;
}
