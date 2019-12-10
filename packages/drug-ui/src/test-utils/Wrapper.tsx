import * as React from 'react';
import { ThemeProvider } from '../index';

interface Props {
    children?: any;
}

const Wrapper: React.FC<Props> = (props) => {
    return (
        <ThemeProvider>
            { props.children }
        </ThemeProvider>
    );
};

export default Wrapper;
