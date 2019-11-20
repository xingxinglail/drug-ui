import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rule, StyleSheet } from 'jss';
import { Variant } from '../../packages/drug-ui/src/Button';
import Icon from '../../packages/drug-ui/src/Icon';
import Button from '../../packages/drug-ui/src/Button';
import createTheme, { Theme } from '../../packages/drug-ui/src/styles/createTheme';
import ThemeProvider from '../../packages/drug-ui/src/themeProvider';

const Test: React.FC = ((props) => {
    const { children, ...rest } = props;
    return <a href="https://baidu.com" { ...rest }>{ children }</a>;
});

const App: React.FC = () => {
    const [a, setA] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [variant, setVariant] = React.useState<Variant>('contained');
    const buttonEl = React.useRef(null);
    const iconEl = React.useRef(null);

    const click: React.MouseEventHandler = (e) => {
        console.log(e);
        setA(true);
    };
    const generateId = (rule: Rule, sheet?: StyleSheet<string>) => {
        return `Dui${ sheet!.options.classNamePrefix }-${ rule.key }`;
    };

    const enter: React.MouseEventHandler = (e) => {
        console.log('enter');
        setA(false);
    };

    const level: React.MouseEventHandler = (e) => {
        console.log(e.target);
    };
    // React.useEffect(() => {
    //     console.log(iconEl);
    //     console.log(buttonEl);
    // }, []);
    // const customTheme = createTheme({});
    // setTimeout(() => {
    //     customTheme.palette.primary.main = 'red';
    //     customTheme.palette.primary.contrastText = 'red';
    //     console.log(customTheme);
    // }, 1000);
    const customTheme = createTheme({});
    const [theme, setTheme] = React.useState<Theme>(customTheme);
    // React.useEffect(() => {
    //     setPalette({
    //         primary: {
    //
    //         }
    //     })
    // }, []);
    // setTimeout(() => {
    //     setTheme((prev) => {
    //         console.log(prev);
    //         return {
    //             palette: {
    //                 primary: prev.palette.primary,
    //                 secondary: {
    //                     main: 'pink',
    //                     contrastText: '#333'
    //                 }
    //             }
    //         };
    //     });
    // }, 1500);

    return (
        <ThemeProvider theme={ theme }>
            <Button fullWidth href="/">世界，你好</Button>
            11
            <Icon className="star" name="left" ref={ iconEl }/>
            <Icon name="down" onMouseEnter={ enter }/>
            <Icon name="right" onMouseLeave={ level }/>
            <br/>
            <div style={ { padding: 40 } }>
                {
                    a ? <Button component={ Test }>你好，世界</Button> : '6777'
                }
                <Button fullWidth href="/">世界，你好</Button>
                <Button fullWidth onClick={ (e) => click(e) }>世界，你好</Button>
                <br/>
                <br/>
                <br/>
                <div>
                    <Button className="asd" variant={ variant } loading={ loading }>嘻嘻哈哈</Button>
                    <Button variant="contained" color="primary" onClick={ () => setLoading(true) }>世界，你好</Button>
                    <Button variant="contained" color="secondary" onClick={ () => setLoading(false) }><Icon
                        name="setting"/>23434</Button>
                    <Button variant="contained" color="secondary" onClick={ () => setVariant('outlined') }>世界，你好<Icon
                        name="setting"/></Button>
                    <Button disabled variant="contained" color="secondary" onClick={ () => setVariant('outlined') }>disabled世界，你好<Icon
                        name="setting"/></Button>
                    <Button variant="contained" color="secondary" loading={ loading }><Icon name="setting"/>世界，你好<Icon
                        name="setting"/></Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Button component='div' loading>世界，你好</Button>
                    <Button color="primary">世界，你好</Button>
                    <Button color="secondary" loading>世界，你好</Button>
                    <Button disabled color="secondary">世界，你好</Button>
                    <Button color="secondary">世界，你好</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Button variant="outlined">世界，你好</Button>
                    <Button variant="outlined" loading color="primary">世界，你好</Button>
                    <Button variant="outlined" color="secondary">世界，你好</Button>
                    <Button variant="outlined" disabled color="secondary">世界，你好</Button>
                    <Button variant="outlined" color="secondary">世界，你好</Button>
                    <Button variant="outlined" color="inherit">世界，你好</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Button size="small" round>世界，你好</Button>
                    <Button size="medium" color="primary">世界，你好</Button>
                    <Button size="large" color="secondary">世界，你好</Button>
                </div>
                <br/>
                <div>
                    <h1>Size</h1>
                    <Button variant="outlined" color="primary" size="small" round>世界，你好</Button>
                    <Button variant="outlined" color="primary" size="medium">世界，你好</Button>
                    <Button variant="outlined" color="primary" size="large">
                        <div>66</div>
                        <Icon name="setting"/>
                    </Button>
                    <Button variant="outlined" color="primary" size="large">{ a }</Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" size="small" round><Icon name="setting"/>世界，你好</Button>
                    <Button variant="contained" color="primary" size="medium"><Icon name="setting"/>世界，你好</Button>
                    <Button variant="contained" color="primary" size="large" loading>世界，你好</Button>
                </div>
                <br/>
                {/*<div>*/}
                {/*    <Button variant="fab" color="primary" size="small"><Icon name="setting" style={ { fontSize: 20 } }/></Button>*/}
                {/*    <Button variant="fab" color="secondary" size="medium"><Icon name="setting"*/}
                {/*                                                                style={ { fontSize: 24 } }/></Button>*/}
                {/*    <Button variant="fab" color="primary" size="large"><Icon name="setting" style={ { fontSize: 28 } }/></Button>*/}
                {/*    <Button variant="fab" color="primary" disabled size="large"><Icon name="setting"*/}
                {/*                                                                      style={ { fontSize: 28 } }/></Button>*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<div>*/}
                {/*    <Button ref={ buttonEl } onClick={ click } color="primary" icon><Icon name="setting"*/}
                {/*                                                                          style={ { fontSize: 20 } }/></Button>*/}
                {/*    <Button color="secondary" icon><Icon name="setting" style={ { fontSize: 20 } }/></Button>*/}
                {/*</div>*/}
            </div>
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
