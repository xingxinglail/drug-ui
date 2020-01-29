import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

import Layouts from './pages/components/Layouts';
import LayoutApi from './pages/api/Layout';

import ScrollBars from './pages/components/ScrollBar';
import ScrollBarApi from './pages/api/ScrollBar';

const App = () => {

    return (
        <ThemeProvider>
            <Router basename="/drug-ui">
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
                    </ul>
                </nav>
                <Switch>
                    <Switch>
                        <Route exact path="/">
                            <Install />
                        </Route>
                        <Route path="/getting-started">
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
                        <Route path="/components/scroll-bar">
                            <ScrollBars />
                        </Route>
                        <Route path="/api/scroll-bar">
                            <ScrollBarApi />
                        </Route>
                    </Switch>
                </Switch>
            </Router>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
