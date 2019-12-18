import * as React from 'react';
import { ThemeProvider } from '../index';

interface Props {
    children?: any;
    [key: string]: any;
}

const Wrapper: React.FC<Props> = (props) => {
    return (
        <ThemeProvider>
            { React.cloneElement(props.children, props) }
        </ThemeProvider>
    );
};

export default Wrapper;
