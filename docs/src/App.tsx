import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Styles } from 'jss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { ThemeProvider } from '@drug-ui/core';
import { createUseStyles, Theme } from '@drug-ui/core/styles';
import Nav from './components/Nav';

const Buttons = React.lazy(() => import('./pages/components/Buttons'));
const ButtonsApi = React.lazy(() => import('./pages/api/Button'));
const ButtonBaseApi = React.lazy(() => import('./pages/api/ButtonBase'));
const ButtonGroupApi = React.lazy(() => import('./pages/api/ButtonGroup'));
const FabApi = React.lazy(() => import('./pages/api/Fab'));
const IconButtonApi = React.lazy(() => import('./pages/api/IconButton'));
const Install = React.lazy(() => import('./pages/components/install/Install'));
const GettingStarted = React.lazy(() => import('./pages/components/gettingStarted/GettingStarted'));
const Layouts = React.lazy(() => import('./pages/components/Layouts'));
const LayoutApi = React.lazy(() => import('./pages/api/Layout'));
const ScrollBars = React.lazy(() => import('./pages/components/ScrollBar'));
const ScrollBarApi = React.lazy(() => import('./pages/api/ScrollBar'));
const Dialogs = React.lazy(() => import('./pages/components/Dialogs'));
const DialogApi = React.lazy(() => import('./pages/api/Dialog'));
const Menu = React.lazy(() => import('./pages/components/Menu'));
const MenuApi = React.lazy(() => import('./pages/api/Menu'));
const SubMenuApi = React.lazy(() => import('./pages/api/SubMenu'));
const MenuItemApi = React.lazy(() => import('./pages/api/MenuItem'));
const Transitions = React.lazy(() => import('./pages/components/Transitions'));
const CollapseApi = React.lazy(() => import('./pages/api/Collapse'));
const FadeApi = React.lazy(() => import('./pages/api/Fade'));
const ZoomApi = React.lazy(() => import('./pages/api/zoom'));

type ClassProps = 'header' | 'main' | 'nav' | 'logo' | 'menu';

const useStyles = createUseStyles<ClassProps>((theme: Theme): Styles => {
    return {
        header: {
            position: 'fixed',
            zIndex: 99999,
            top: 0,
            right: 0,
            width: 'calc(100% - 240px)',
            height: 64,
            color: '#fff',
            backgroundColor: '#1976d2',
            boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)'
        },
        main: {
            padding: [80, 266, 40, 340]
        }
    };
}, 'Container');

const { Suspense } = React;

const Container = () => {
    const classes = useStyles();

    return (
        <>
            <Nav />
            <header className={ classes.header } />
            <main className={ classes.main }>
                <Suspense fallback={ <div>Loading...</div> }>
                    <Switch>
                        <Route path="/getting-started/installation">
                            <Install />
                        </Route>
                        <Route path="/getting-started/usage" component={ GettingStarted } />
                        <Route path="/components/buttons">
                            <Buttons />
                        </Route>
                        <Route path="/api/button" component={ ButtonsApi } />
                        <Route path="/api/button-base" component={ ButtonBaseApi } />
                        <Route path="/api/button-group" component={ ButtonGroupApi } />
                        <Route path="/api/fab" component={ FabApi } />
                        <Route path="/api/icon-button" component={ IconButtonApi } />
                        <Route path="/components/layouts" component={ Layouts } />
                        <Route path="/api/layout" component={ LayoutApi } />
                        <Route path="/components/scroll-bars" component={ ScrollBars } />
                        <Route path="/api/scroll-bar" component={ ScrollBarApi } />
                        <Route path="/components/dialogs" component={ Dialogs } />
                        <Route path="/api/dialog" component={ DialogApi } />
                        <Route path="/components/menus" component={ Menu } />
                        <Route path="/api/menu" component={ MenuApi } />
                        <Route path="/api/sub-menu" component={ SubMenuApi } />
                        <Route path="/api/menu-item" component={ MenuItemApi } />
                        <Route path="/components/transitions" component={ Transitions } />
                        <Route path="/api/collapse" component={ CollapseApi } />
                        <Route path="/api/fade" component={ FadeApi } />
                        <Route path="/api/zoom" component={ ZoomApi } />
                    </Switch>
                </Suspense>
            </main>
            <nav>
                <ul>
                    <li>
                        <Link to="/">安装</Link>
                    </li>
                    <li>
                        <Link to="/getting-started">快速上手</Link>
                    </li>
                    <li>
                        <Link to="/components/buttons">Button (按钮)</Link>
                    </li>
                    <li>
                        <Link to="/api/button">Button API</Link>
                    </li>
                    <li>
                        <Link to="/api/button-base">ButtonBase API</Link>
                    </li>
                    <li>
                        <Link to="/api/button-group">ButtonGroupApi API</Link>
                    </li>
                    <li>
                        <Link to="/api/fab">Fab API</Link>
                    </li>
                    <li>
                        <Link to="/api/icon-button">IconButton API</Link>
                    </li>
                    <li>
                        <Link to="/components/layouts">Layout (布局)</Link>
                    </li>
                    <li>
                        <Link to="/api/layout">Layout API</Link>
                    </li>
                    <li>
                        <Link to="/components/scroll-bar">ScrollBar (滚动条)</Link>
                    </li>
                    <li>
                        <Link to="/api/scroll-bar">ScrollBar API</Link>
                    </li>
                    <li>
                        <Link to="/components/dialogs">Dialog (对话框)</Link>
                    </li>
                    <li>
                        <Link to="/api/dialog">Dialog API</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <Router basename="/drug-ui">
                <Container />
            </Router>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
