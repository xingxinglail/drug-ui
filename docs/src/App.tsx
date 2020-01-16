import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Buttons from './pages/Buttons/Buttons';
import ButtonsApi from './pages/api/Button/Button';
import { ThemeProvider } from '@drug-ui/core';

const App = () => {

    return (
        <ThemeProvider>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">快速上手</Link>
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
                            getstarted
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
