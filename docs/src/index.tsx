import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rule, StyleSheet } from 'jss';
import { Variant } from '../../packages/drug-ui/src/Button';
import { Button, IconButton, SvgIcon, ThemeProvider } from '../../packages/drug-ui/src';
// import { Setting, Down, Left, CloseCircleFill } from '../../packages/drug-ui-icons/src';
import { Setting, Down, Left, CloseCircleFill } from '@drug-ui/icons';
import Fab from '../../packages/drug-ui/src/Fab';
import createTheme, { Theme } from '../../packages/drug-ui/src/styles/createTheme';

const Test: React.FC = ((props) => {
    const { children, ...rest } = props;
    return <a href="https://baidu.com" { ...rest }>{ children }</a>;
});

const App: React.FC = () => {
    const [test, setTest] = React.useState(false);
    const [a, setA] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [variant, setVariant] = React.useState<Variant>('contained');
    const buttonEl = React.useRef(null);
    const iconEl = React.useRef(null);
    // setInterval(() => {
    //     setTest(!test)
    // }, 2000)
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
    const customTheme = createTheme({});
    const [theme, setTheme] = React.useState<Theme>(customTheme);

    const toggleTheme = () => {
        console.log(iconEl);
        setTheme((prev) => {
            if (prev.palette.secondary.main === 'pink') {
                return customTheme;
            }
            return {
                typography: prev.typography,
                palette: {
                    primary: prev.palette.primary,
                    secondary: {
                        main: 'pink',
                        contrastText: '#fff'
                    }
                }
            };
        });
    };

    return (
        <ThemeProvider theme={ theme }>
            <Fab className="aaa">阿</Fab>
            <SvgIcon className="bbb" htmlColor="red">1</SvgIcon>
            <Setting ref={ iconEl } className="ccc" />
            <CloseCircleFill className="ccc" />
            <Down />
            <IconButton className="bbb"><Down htmlColor="red" /></IconButton>
            <Left/>
            <CloseCircleFill/>
            <div onClick={ () => setTest(!test) }>{ test ? '点击隐藏' : '点击显示' }</div>
            <br/>
            <Button className="aaaa">你好，世界</Button>
            <Button color="primary" size="small">你好，世界</Button>
            <Button color="secondary">你好，世界</Button>
            <br/>
            <Button variant="contained">你好，世界</Button>
            <Button variant="contained" color="primary">你好，世界</Button>
            <Button variant="contained" color="secondary">你好，世界</Button>
            { test ? (
                <>
                    <br/>
                    <IconButton>我</IconButton>
                    <IconButton>H</IconButton>
                    <IconButton color="primary">我</IconButton>
                    <IconButton color="secondary">H</IconButton>
                    <IconButton><Left/></IconButton>
                    <IconButton color="primary" centerRipple><Left/></IconButton>
                    <IconButton color="secondary"><Left/></IconButton>
                    <IconButton color="inherit"><Left/></IconButton>
                    <IconButton color="secondary" disabled><Left/></IconButton>
                    <div>
                        <IconButton size="small" color="primary"><Left/></IconButton>
                        <IconButton size="medium" color="primary" centerRipple><Left/></IconButton>
                        <IconButton color="primary"><Left/></IconButton>
                    </div>
                    <br/>
                    <br/>
                    <Fab>我</Fab>
                    <Fab>H</Fab>
                    <Fab color="primary">我</Fab>
                    <Fab color="secondary">H</Fab>
                    <Fab><Left/></Fab>
                    <Fab color="primary" centerRipple><Left/></Fab>
                    <Fab color="secondary"><Left/></Fab>
                    <Fab color="inherit"><Left/></Fab>
                    <Fab color="secondary" disabled><Left/></Fab>
                    <div>
                        <Fab size="small" color="primary"><Left/></Fab>
                        <Fab size="medium" color="primary" centerRipple><Setting></Setting></Fab>
                        <Fab color="primary"><Left/></Fab>
                    </div>
                    <br/>
                    <br/>
                    <Button fullWidth variant="contained" color="secondary" onClick={ toggleTheme }>点击切换主题</Button>
                    <Button fullWidth href="/">世界，你好</Button>
                    <Left/>
                    <Left/>
                    <Left/>
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
                            <Button className="asd" variant={ variant }>嘻嘻哈哈</Button>
                            <Button variant="contained" color="primary"
                                    onClick={ () => setLoading(true) }>世界，你好</Button>
                            <Button variant="contained" color="secondary"
                                    onClick={ () => setLoading(false) }>23434</Button>
                            <Button variant="contained" color="secondary"
                                    onClick={ () => setVariant('outlined') }>世界，你好</Button>
                            <Button variant="contained" color="secondary"
                                    onClick={ () => setVariant('contained') }>disabled世界，你好</Button>
                            <Button disabled variant="contained" color="secondary">世界，你好</Button>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Button component='div'>世界，你好</Button>
                            <Button color="primary" centerRipple>世界，center你好</Button>
                            <Button color="secondary">世界，你好</Button>
                            <Button disabled color="secondary">世界，你好</Button>
                            <Button color="secondary">世界，你好</Button>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Button variant="outlined">世界，你好</Button>
                            <Button variant="outlined" color="primary">世界，你好</Button>
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
                                <Setting/>
                            </Button>
                            <Button variant="outlined" color="primary" size="large">{ a }</Button>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" size="small" round>世界，你好</Button>
                            <Button variant="contained" color="primary" size="medium">世界，你好</Button>
                            <Button variant="contained" color="primary" size="large">世界，你好</Button>
                        </div>
                        <br/>
                    </div>
                </>
            ) : null }
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
