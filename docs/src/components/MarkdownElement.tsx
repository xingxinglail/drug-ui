import * as React from 'react';
import * as marked from 'marked';
import { createUseStyles } from '@drug-ui/styles';
import textToHash from '../utils/textToHash';
import prism from '../utils/prism';

marked.Lexer.prototype.lex = function (src: string) {
    src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u2424/g, '\n');
    return this.token(src, true);
};

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
    // Small title. No need for an anchor.
    // It's reducing the risk of duplicated id and it's fewer elements in the DOM.
    if (level >= 4) {
        return `<h${ level }>${ text }</h${ level }>`;
    }

    const data = {};
    const escapedText = textToHash(text, data);

    return (
        `
    <h${ level }>
      <a class="anchor-link" id="${ escapedText }"></a>${ text }` +
        `<a class="anchor-link-style" aria-label="anchor" href="#${ escapedText }">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M46.9 13.9c-.5-.6-1.2-.94-2.07-.94h-6.67l1.86-8.98c.17-.85 0-1.7-.52-2.3-.48-.6-1.2-.94-2.07-.94-1.6 0-3.2 1.27-3.54 2.93l-.5 2.42c0 .07-.07.13-.07.2l-1.37 6.62H20.7l1.88-8.96c.16-.85 0-1.7-.53-2.3-.48-.6-1.2-.94-2.07-.94-1.65 0-3.2 1.27-3.56 2.93l-.52 2.58v.08l-1.37 6.64H7.3c-1.67 0-3.22 1.3-3.58 2.96-.16.86 0 1.7.52 2.3.48.6 1.2.93 2.07.93h6.97l-2 9.65H4c-1.67 0-3.22 1.27-3.56 2.94-.2.8 0 1.67.5 2.27.5.6 1.2.93 2.08.93H10l-1.84 9.05c-.2.84 0 1.67.52 2.3.5.6 1.25.92 2.08.92 1.66 0 3.2-1.3 3.55-2.94l1.94-9.33h11.22l-1.87 9.05c-.15.84.03 1.67.53 2.3.5.6 1.2.92 2.07.92 1.65 0 3.22-1.3 3.56-2.94l1.9-9.33h7c1.6 0 3.2-1.28 3.53-2.93.2-.87 0-1.7-.52-2.3-.48-.62-1.2-.96-2.05-.96h-6.7l2.02-9.65h6.93c1.67 0 3.22-1.27 3.56-2.92.2-.85 0-1.7-.5-2.3l-.04.03zM17.53 28.77l1.95-9.65H30.7l-1.97 9.66H17.5h.03z"/></svg>
      </a></h${ level }>
  `
    );
};

renderer.link = (href, title, text) => {

    // let finalHref = href;
    //
    // if (finalHref.indexOf('/') === 0 && finalHref !== '/size-snapshot') {
    //     finalHref = `/${ finalHref }`;
    // }

    return `<a href="${ href }" renderer-link>${ text }</a>`;
};

const markedOptions = {
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight (code: string, language: string) {
        let prismLanguage;
        switch (language) {
            case 'ts':
                prismLanguage = prism.languages.tsx;
                break;
            case 'js':
            case 'sh':
                prismLanguage = prism.languages.jsx;
                break;

            case 'diff':
                prismLanguage = { ...prism.languages.diff };
                // original `/^[-<].*$/m` matches lines starting with `<` which matches
                // <SomeComponent />
                // we will only use `-` as the deleted marker
                prismLanguage.deleted = /^[-].*$/m;
                break;

            default:
                prismLanguage = prism.languages[language];
                break;
        }

        if (!prismLanguage) {
            if (language) {
                throw new Error(`unsupported language: "${ language }", "${ code }"`);
            } else {
                prismLanguage = prism.languages.jsx;
            }
        }
        return prism.highlight(code, prismLanguage, language);
    },
    renderer
};

const useStyles = createUseStyles({
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.87)',
        '& .anchor-link': {
            marginTop: -96, // Offset for the anchor.
            position: 'absolute',
        },
        '& pre': {
            margin: '24px 0',
            padding: '12px 18px',
            backgroundColor: '#333',
            direction: 'ltr',
            borderRadius: 4,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
        },
        '& code': {
            display: 'inline-block',
            fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
            WebkitFontSmoothing: 'subpixel-antialiased',
            padding: '2px 6px',
            backgroundColor: 'rgba(255,229,100,0.2)',
            fontSize: 14,
            borderRadius: 2,
        },
        '& code[class*="language-"]': {
            backgroundColor: '#333',
            color: '#fff',
        },
        '& p code, & ul code, & pre code': {
            fontSize: 14,
        },
        '& .token.operator': {
            background: 'transparent',
        },
        '& h1': {
            fontSize: 40,
            margin: '16px 0',
            fontWeight: 400
        },
        '& .description': {
            margin: '0 0 40px',
            fontSize: 24
        },
        '& h2': {
            fontSize: 30,
            margin: '40px 0 16px',
            fontWeight: 400
        },
        '& h3': {
            margin: '40px 0 16px',
        },
        '& h4': {
            margin: '32px 0 16px',
        },
        '& h5': {
            margin: '32px 0 16px',
        },
        '& p, & ul, & ol': {
            lineHeight: 1.6,
            marginTop: 0,
            marginBottom: '16px',
        },
        '& ul': {
            paddingLeft: 30,
        },
        '& h1, & h2, & h3, & h4': {
            '& code': {
                fontSize: 'inherit',
                lineHeight: 'inherit',
                // Remove scroll on small screens.
                wordBreak: 'break-all',
            },
            '& .anchor-link-style': {
                opacity: 0,
                // To prevent the link to get the focus.
                display: 'none',
            },
            '&:hover .anchor-link-style': {
                display: 'inline-block',
                opacity: 1,
                padding: '0 8px',
                color: 'rgba(0, 0, 0, 0.54)',
                '&:hover': {
                    color: 'rgba(0, 0, 0, 0.87)',
                },
                '& svg': {
                    width: '0.55em',
                    height: '0.55em',
                    fill: 'currentColor',
                },
            },
        },

        '& table': {
            width: '100%',
            display: 'block',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            borderCollapse: 'collapse',
            marginBottom: '16px',
            borderSpacing: 0,
            overflow: 'hidden',
            '& .prop-name': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
            },
            '& .required': {
                color: '#006500',
            },
            '& .prop-type': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                color: '#932981'
            },
            '& .prop-default': {
                fontSize: 13,
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                borderBottom: `1px dotted rgba(0, 0, 0, 0.38)`,
            },
        },
        '& td': {
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '0.875rem',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 400,
            lineHeight: 1.43,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            letterSpacing: '0.01071em',
            padding: 16
        },
        '& td code': {
            fontSize: 13,
            lineHeight: 1.6,
        },

        '& th': {
            color: 'rgba(0, 0, 0, 0.87)',
            fontWeight: 500,
            lineHeight: '1.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            fontSize: 14,
            whiteSpace: 'pre',
            padding: 16,
        },
        '& blockquote': {
            borderLeft: '5px solid #ffe564',
            backgroundColor: 'rgba(255,229,100,0.2)',
            padding: '4px 24px',
            margin: '24px 0',
            '& p': {
                marginTop: '16px',
            },
        },
        '& a, & a code': {
            // Style taken from the Link component
            color: 'rgb(220, 0, 78)',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        '& img': {
            maxWidth: '100%',
        },
        '& hr': {
            height: 1,
            margin: [48, 0],
            border: 'none',
            flexShrink: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.12)'
        },
    },
}, { name: 'MarkdownElement' });

interface MarkdownElementProps {
    text: string;
}

const MarkdownElement: React.FC<MarkdownElementProps> = props => {
    const { text } = props;
    const classes = useStyles();

    return (
        <div
            className={ classes.root }
            dangerouslySetInnerHTML={ { __html: marked(text, markedOptions) } } />
    );
};

export default MarkdownElement;
