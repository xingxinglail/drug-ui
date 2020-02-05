import * as React from 'react';
import { demoRegexp, getContents } from '../utils/parseMarkdown';
import Demo from './Demo';
import MarkdownElement from './MarkdownElement';
import AppTableOfContents from './AppTableOfContents';

interface MarkdownDocsProps {
    req?: __WebpackModuleApi.RequireContext;
    reqSource?: __WebpackModuleApi.RequireContext;
    reqPrefix?: string;
    markdown?: string;
}

const MarkdownDocs: React.FC<MarkdownDocsProps> = props => {
    const { req, reqSource, markdown: markdownProp = '', reqPrefix } = props;
    const demos = {};
    let markdown = markdownProp;
    if (req) {
        req.keys().forEach(filename => {
            if (filename.endsWith('.md')) {
                markdown = req(filename).default;
            } else if (filename.endsWith('.tsx')) {
                const demoName = `${ reqPrefix }/${ filename.replace(/\.\//g, '').replace(/\.tsx/g, '.js') }`;
                const rawTS = reqSource!(filename).default;
                demos[demoName] = {
                    ...demos[demoName],
                    tsx: req(filename).default,
                    rawTS
                };
            } else {
                const demoName = `${ reqPrefix }/${ filename.replace(/\.\//g, '') }`;
                demos[demoName] = {
                    ...demos[demoName],
                    // js: req(filename).default,
                    raw: reqSource!(filename).default,
                };
            }
        });
    }
    const contents = getContents(markdown);
    return (
        <>
            <AppTableOfContents contents={ contents } />
            <div>
                {
                    contents.map(content => {
                        if (demoRegexp.test(content)) {
                            const demoOptions = JSON.parse(`{${ content }}`);
                            return <Demo key={ content } demo={ demos[demoOptions.demo] } />;
                        } else {
                            return <MarkdownElement key={ content } text={ content } />;
                        }
                    })
                }
            </div>
        </>
    );
};

export default MarkdownDocs;
