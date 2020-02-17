import './public-path';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Styles } from 'jss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from 'react-router-dom';
import { ThemeProvider, IconButton } from '@drug-ui/core';
import { Github, Search } from '@drug-ui/icons';
import { createUseStyles, Theme } from '@drug-ui/core/styles';
import asyncComponent from './components/asyncComponent';
import MarkdownLinks from './components/MarkdownLinks';
import Nav from './components/Nav';
import Index from './pages/Index';

if ('serviceWorker' in navigator) {
    console.log(333);
    // Your service-worker.js *must* be located at the top-level directory relative to your site.
    // It won't be able to control pages unless it's located at the same level or higher than them.
    // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
    // See https://github.com/slightlyoff/ServiceWorker/issues/468
    navigator.serviceWorker.register('/drug-ui/sw.js').then(function(reg) {
        // updatefound is fired if service-worker.js changes.
        reg.onupdatefound = function() {
            // The updatefound event implies that reg.installing is set; see
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = reg.installing;

            // @ts-ignore
            installingWorker.onstatechange = function() {
                // @ts-ignore
                switch (installingWorker.state) {
                    case 'installed':
                        if (navigator.serviceWorker.controller) {
                            // At this point, the old content will have been purged and the fresh content will
                            // have been added to the cache.
                            // It's the perfect time to display a "New content is available; please refresh."
                            // message in the page's interface.
                            console.log('New or updated content is available.');
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a "Content is cached for offline use." message.
                            console.log('Content is now available offline!');
                        }
                        break;

                    case 'redundant':
                        console.error('The installing service worker became redundant.');
                        break;
                }
            };
        };
    }).catch(function(e) {
        console.error('Error during service worker registration:', e);
    });
}

const Buttons = asyncComponent(() => import('./pages/components/Buttons'));
const ButtonsApi = asyncComponent(() => import('./pages/api/Button'));
const ButtonBaseApi = asyncComponent(() => import('./pages/api/ButtonBase'));
const ButtonGroupApi = asyncComponent(() => import('./pages/api/ButtonGroup'));
const FabApi = asyncComponent(() => import('./pages/api/Fab'));
const IconButtonApi = asyncComponent(() => import('./pages/api/IconButton'));
const Installation = asyncComponent(() => import('./pages/getting-started/installation/Installation'));
const Usage = asyncComponent(() => import('./pages/getting-started/usage/Usage'));
const Layouts = asyncComponent(() => import('./pages/components/Layouts'));
const LayoutApi = asyncComponent(() => import('./pages/api/Layout'));
const ScrollBars = asyncComponent(() => import('./pages/components/ScrollBar'));
const ScrollBarApi = asyncComponent(() => import('./pages/api/ScrollBar'));
const Dialogs = asyncComponent(() => import('./pages/components/Dialogs'));
const DialogApi = asyncComponent(() => import('./pages/api/Dialog'));
const Menu = asyncComponent(() => import('./pages/components/Menu'));
const MenuApi = asyncComponent(() => import('./pages/api/Menu'));
const SubMenuApi = asyncComponent(() => import('./pages/api/SubMenu'));
const MenuItemApi = asyncComponent(() => import('./pages/api/MenuItem'));
const Transitions = asyncComponent(() => import('./pages/components/Transitions'));
const CollapseApi = asyncComponent(() => import('./pages/api/Collapse'));
const FadeApi = asyncComponent(() => import('./pages/api/Fade'));
const ZoomApi = asyncComponent(() => import('./pages/api/zoom'));

type ClassProps = 'header' | 'main' | 'nav' | 'logo' | 'menu';

const useStyles = createUseStyles<ClassProps>((theme: Theme): Styles => {
    return {
        '@global': {
            '#nprogress': {
                direction: 'ltr',
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                backgroundColor: '#e0e0e0',
                zIndex: 2000,
                '& .bar': {
                    position: 'fixed',
                    backgroundColor: '#000',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2
                }
            }
        },
        main: {
            padding: [80, 266, 40, 340]
        }
    };
}, 'Container');

const Container = () => {
    const classes = useStyles();

    return (
        <>
            <Nav />
            <main className={ classes.main }>
                <Switch>
                    <Route path="/getting-started/installation" component={ Installation } />
                    <Route path="/getting-started/usage" component={ Usage } />
                    <Route path="/components/Buttons" component={ Buttons } />
                    <Route path="/api/Button" component={ ButtonsApi } />
                    <Route path="/api/ButtonBase" component={ ButtonBaseApi } />
                    <Route path="/api/ButtonGroup" component={ ButtonGroupApi } />
                    <Route path="/api/Fab" component={ FabApi } />
                    <Route path="/api/IconButton" component={ IconButtonApi } />
                    <Route path="/components/Layouts" component={ Layouts } />
                    <Route path="/api/Layout" component={ LayoutApi } />
                    <Route path="/components/scrollBar" component={ ScrollBars } />
                    <Route path="/api/scrollBar" component={ ScrollBarApi } />
                    <Route path="/components/Dialogs" component={ Dialogs } />
                    <Route path="/api/Dialog" component={ DialogApi } />
                    <Route path="/components/Menu" component={ Menu } />
                    <Route path="/api/Menu" component={ MenuApi } />
                    <Route path="/api/SubMenu" component={ SubMenuApi } />
                    <Route path="/api/MenuItem" component={ MenuItemApi } />
                    <Route path="/components/Transitions" component={ Transitions } />
                    <Route path="/api/Collapse" component={ CollapseApi } />
                    <Route path="/api/Fade" component={ FadeApi } />
                    <Route path="/api/Zoom" component={ ZoomApi } />
                </Switch>
            </main>
        </>
    );
};

type HeaderClassProps = 'root';

const useHeaderStyles = createUseStyles<HeaderClassProps>((theme: Theme): Styles => {
    return {
        root: {
            position: 'fixed',
            zIndex: 1000,
            top: 0,
            right: 0,
            width: 'calc(100% - 240px)',
            height: 64,
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: [0, 24],
            boxSizing: 'border-box',
            '& svg': {
                fontSize: 28
            }
        }
    };
}, 'Header');

const RouterWrapper = () => {
    const location = useLocation();
    const classes = useHeaderStyles();

    return (
        <>
            <header className={ classes.root } style={{ width: location.pathname === '/' ? '100%' : '' }}>
                {/*<Search  />*/ }
                <IconButton size="medium" href="https://github.com/xingxinglail/drug-ui"><Github /></IconButton>
            </header>
            {
                location.pathname !== '/' ? <Container /> :
                    <Switch>
                        <Route path="/" component={ Index } />
                    </Switch>
            }
        </>
    );
};

const App = () => {

    return (
        <ThemeProvider>
            <Router basename="/drug-ui">
                <MarkdownLinks />
                <RouterWrapper />
            </Router>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
