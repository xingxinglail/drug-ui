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
import Install from './pages/components/install/Install';
import GettingStarted from './pages/components/gettingStarted/GettingStarted';
import { ThemeProvider } from '@drug-ui/core';

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
                            <Link to="/api/button">Button</Link>
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
