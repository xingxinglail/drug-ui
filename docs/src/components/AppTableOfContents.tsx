import * as React from 'react';
import * as marked from 'marked';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import textToHash from '../utils/textToHash';

interface AppTableOfContentsProps {
    contents: string[];
}

interface Content {
    text: string;
    level: number;
    hash: string;
}

interface ContentWidthChildren extends Content {
    children: Content[]
}

interface ItemsClient extends Content {
    node: HTMLElement | null
}

interface ItemsCollectorRef {
    current: ContentWidthChildren[]
}

const renderer = new marked.Renderer();

function setRenderer (itemsCollector: ItemsCollectorRef, unique: object) {
    // @ts-ignore
    renderer.heading = (text2, level) => {
        const text = text2.replace(
            /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
            '',
        ) // remove emojis
            .replace(/<\/?[^>]+(>|$)/g, ''); // remove HTML

        if (level === 2) {
            itemsCollector.current.push({
                text,
                level,
                hash: textToHash(text, unique),
                children: [],
            });
        } else if (level === 3) {
            if (!itemsCollector.current[itemsCollector.current.length - 1]) {
                throw new Error(`Missing parent level for: ${ text }`);
            }

            itemsCollector.current[itemsCollector.current.length - 1].children.push({
                text,
                level,
                hash: textToHash(text, unique),
            });
        }
    };
}

function getItemsServer (contents: string[], itemsCollector: ItemsCollectorRef) {
    marked(contents.join(''), { renderer });
    return itemsCollector.current;
}

function getItemsClient (items: ContentWidthChildren[]) {
    const itemsClient: ItemsClient[] = [];

    items.forEach(item2 => {
        itemsClient.push({
            ...item2,
            node: document.getElementById(item2.hash),
        });

        if (item2.children.length > 0) {
            item2.children.forEach(item3 => {
                itemsClient.push({
                    ...item3,
                    node: document.getElementById(item3.hash),
                });
            });
        }
    });
    return itemsClient;
}

const useStyles = createUseStyles({
    root: {
        position: 'fixed',
        top: 70,
        right: 0,
        width: 175,
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        padding: [16, 16, 16, 0],
        display: 'block',
        backgroundColor: '#fff',
        zIndex: 10
    },
    contents: {
        margin: [16, 0, 8],
        paddingLeft: 12,
    },
    ul: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
    },
    item: {
        display: 'block',
        fontSize: 13,
        padding: [4, 0, 4, 8],
        color: 'rgba(0, 0, 0, 0.54)',
        borderLeft: '4px solid transparent',
        boxSizing: 'content-box',
        '&:hover': {
            borderLeft: '4px solid #eee'
        },
        '&$active,&:active': {
            borderLeft: '4px solid #e0e0e0'
        }
    },
    active: {
        color: 'rgba(0, 0, 0, 0.87)',
        borderLeft: '4px solid #e0e0e0'
    }
}, { name: 'AppTableOfContents' });

const AppTableOfContents: React.FC<AppTableOfContentsProps> = props => {
    const { contents } = props;
    const classes = useStyles();
    const itemsServer = React.useMemo(() => {
        const itemsCollectorRef = { current: [] };
        setRenderer(itemsCollectorRef, {});
        return getItemsServer(contents, itemsCollectorRef);
    }, [contents]);

    const itemsClientRef = React.useRef<ItemsClient[]>([]);
    React.useEffect(() => {
        itemsClientRef.current = getItemsClient(itemsServer);
    }, [itemsServer]);

    const [activeState, setActiveState] = React.useState('');
    const clickedRef = React.useRef(false);
    const unsetClickedRef = React.useRef(0);

    const findActiveIndex = React.useCallback(() => {
        // Don't set the active index based on scroll if a link was just clicked
        if (clickedRef.current) {
            return;
        }

        let active;
        for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
            // No hash if we're near the top of the page
            if (document.documentElement.scrollTop < 200) {
                active = { hash: null };
                break;
            }

            const item = itemsClientRef.current[i];

            if (process.env.NODE_ENV !== 'production') {
                if (!item.node) {
                    console.error(`Missing node on the item ${ JSON.stringify(item, null, 2) }`);
                }
            }

            if (
                item.node &&
                item.node.offsetTop <
                document.documentElement.scrollTop + document.documentElement.clientHeight / 8
            ) {
                active = item;
                break;
            }
        }

        if (active && activeState !== active.hash) {
            // @ts-ignore
            setActiveState(active.hash);
        }
    }, [activeState]);

    React.useEffect(() => {
        if (itemsServer.length > 0) window.addEventListener('scroll', findActiveIndex);

        return () => {
            window.removeEventListener('scroll', findActiveIndex);
        }
    }, [findActiveIndex, itemsServer])

    const handleClick = (hash: string) => {
        // Used to disable findActiveIndex if the page scrolls due to a click
        clickedRef.current = true;
        unsetClickedRef.current = window.setTimeout(() => {
            clickedRef.current = false;
        }, 1000);

        if (activeState !== hash) {
            setActiveState(hash);
        }
    };

    React.useEffect(
        () => () => {
            clearTimeout(unsetClickedRef.current);
        },
        []
    );

    const itemLink = (item: ContentWidthChildren, secondary?: boolean) => (
        <a
            href={ `#${ item.hash }` }
            onClick={ () => handleClick(item.hash) }
            className={ classnames(
                classes.item,
                activeState === item.hash ? classes.active : undefined,
            ) }>
            <span dangerouslySetInnerHTML={ { __html: item.text } } />
        </a>
    );

    return (
        <nav className={ classes.root } aria-label="目录内容的页面">
            { itemsServer.length > 0 ? (
                <>
                    <p className={ classes.contents }>目录</p>
                    <ul className={ classes.ul }>
                        { itemsServer.map((item2) => (
                            <li key={ item2.text }>
                                { itemLink(item2) }
                            </li>
                        )) }
                    </ul>
                </>
            ) : null }
        </nav>
    );
};

export default AppTableOfContents;
