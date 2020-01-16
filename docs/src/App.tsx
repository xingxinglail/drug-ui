import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Buttons from './pages/Buttons/Buttons';
import ButtonsApi from './pages/api/Button/Button';
import { ThemeProvider } from '@drug-ui/core';

const App = () => {

    return (
        <ThemeProvider>
            <ButtonsApi />
            <Buttons />
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
