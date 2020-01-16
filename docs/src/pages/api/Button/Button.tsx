import * as React from 'react';
import MarkdownDocs from '../../../components/MarkdownDocs';
// @ts-ignore
import markdown from './button.md';

export default function Page () {
    return <MarkdownDocs markdown={ markdown } />;
}
