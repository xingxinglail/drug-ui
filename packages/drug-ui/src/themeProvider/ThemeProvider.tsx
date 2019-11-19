import * as React from 'react';
import { JssProvider, ThemeProvider as BaseProvider } from '@drug-ui/styles';
import { Rule, StyleSheet } from 'jss';
import createTheme, { Theme } from '../styles/createTheme';

interface ThemeProviderProps {
    theme?: Theme
    children: React.ReactNode
}

const generateId = (rule: Rule, sheet?: StyleSheet<string>) => {
    return `Dui${ sheet!.options.classNamePrefix }${ rule.key }`;
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props): React.ReactElement => {
    const { theme = {}, children, ...rest } = props;
    const customTheme = createTheme(theme);
    return (
        <JssProvider generateId={ generateId } { ...rest }>
            <BaseProvider theme={ customTheme }>{ children }</BaseProvider>
        </JssProvider>
    );
};

export default ThemeProvider;
