import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Styles } from 'jss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from 'react-router-dom';
import Buttons from './pages/components/Buttons';
import ButtonsApi from './pages/api/Button';
import ButtonBaseApi from './pages/api/ButtonBase';
import ButtonGroupApi from './pages/api/ButtonGroup';
import FabApi from './pages/api/Fab';
import IconButtonApi from './pages/api/IconButton';
import Install from './pages/components/install/Install';
import GettingStarted from './pages/components/gettingStarted/GettingStarted';
import { ThemeProvider } from '@drug-ui/core';
import { createUseStyles, Theme } from '@drug-ui/core/styles';
import Nav from './components/Nav';

import Layouts from './pages/components/Layouts';
import LayoutApi from './pages/api/Layout';

import ScrollBars from './pages/components/ScrollBar';
import ScrollBarApi from './pages/api/ScrollBar';

import Dialogs from './pages/components/Dialogs';
import DialogApi from './pages/api/Dialog';

import Menu from './pages/components/Menu';
import MenuApi from './pages/api/Menu';
import SubMenuApi from './pages/api/SubMenu';
import MenuItemApi from './pages/api/MenuItem';

import Transitions from './pages/components/Transitions';
import CollapseApi from './pages/api/Collapse';

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
            padding: [80, 200, 40, 340]
        }
    };
}, 'Container');

const Test = () => {
    const classes = useStyles();

    return (
        <div>
            <Nav />
            <header className={ classes.header } />
            <main className={ classes.main }>
                <Switch>
                    <Route path="/getting-started/installation">
                        <Install />
                    </Route>
                    <Route path="/getting-started/usage">
                        <GettingStarted />
                    </Route>
                    <Route path="/components/buttons">
                        <Buttons />
                    </Route>
                    <Route path="/api/button">
                        <ButtonsApi />
                    </Route>
                    <Route path="/api/button-base">
                        <ButtonBaseApi />
                    </Route>
                    <Route path="/api/button-group">
                        <ButtonGroupApi />
                    </Route>
                    <Route path="/api/fab">
                        <FabApi />
                    </Route>
                    <Route path="/api/icon-button">
                        <IconButtonApi />
                    </Route>
                    <Route path="/components/layouts">
                        <Layouts />
                    </Route>
                    <Route path="/api/layout">
                        <LayoutApi />
                    </Route>
                    <Route path="/components/scroll-bars">
                        <ScrollBars />
                    </Route>
                    <Route path="/api/scroll-bar">
                        <ScrollBarApi />
                    </Route>
                    <Route path="/components/dialogs">
                        <Dialogs />
                    </Route>
                    <Route path="/api/dialog">
                        <DialogApi />
                    </Route>
                    <Route path="/components/menus">
                        <Menu />
                    </Route>
                    <Route path="/api/menu">
                        <MenuApi />
                    </Route>
                    <Route path="/api/sub-menu">
                        <SubMenuApi />
                    </Route>
                    <Route path="/api/menu-item">
                        <MenuItemApi />
                    </Route>
                    <Route path="/components/transitions">
                        <Transitions />
                    </Route>
                    <Route path="/api/collapse">
                        <CollapseApi />
                    </Route>
                </Switch>
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
        </div>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <Router basename="/drug-ui">
                <Test />
            </Router>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
