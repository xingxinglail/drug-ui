import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rule, StyleSheet } from 'jss';
import { Variant } from '../../packages/drug-ui/src/Button';
import Icon from '../../packages/drug-ui/src/Icon';
import Button from '../../packages/drug-ui/src/Button';
import Fab from '../../packages/drug-ui/src/Fab';
import IconButton from '../../packages/drug-ui/src/IconButton';
import createTheme, { Theme } from '../../packages/drug-ui/src/styles/createTheme';
import ThemeProvider from '../../packages/drug-ui/src/themeProvider';

const Test: React.FC = ((props) => {
    const { children, ...rest } = props;
    return <a href="https://baidu.com" { ...rest }>{ children }</a>;
});

const App: React.FC = () => {
    const [test, setTest] = React.useState(true);
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
            <div onClick={ () => setTest(!test) }>{ test ? '点击隐藏' : '点击显示' }</div>
            { test ? (
                <>
                    <br/>
                    <IconButton>我</IconButton>
                    <IconButton>H</IconButton>
                    <IconButton color="primary">我</IconButton>
                    <IconButton color="secondary">H</IconButton>
                    <IconButton><Icon className="star" name="left" ref={ iconEl }/></IconButton>
                    <IconButton color="primary" centerRipple><Icon className="star" name="left"
                                                                   ref={ iconEl }/></IconButton>
                    <IconButton color="secondary"><Icon className="star" name="left" ref={ iconEl }/></IconButton>
                    <IconButton color="inherit"><Icon className="star" name="left" ref={ iconEl }/></IconButton>
                    <IconButton color="secondary" disabled><Icon className="star" name="left"
                                                                 ref={ iconEl }/></IconButton>
                    <div>
                        <IconButton size="small" color="primary"><Icon className="star" name="left"
                                                                       ref={ iconEl }/></IconButton>
                        <IconButton size="medium" color="primary" centerRipple><Icon className="star" name="left"
                                                                                     ref={ iconEl }/></IconButton>
                        <IconButton color="primary"><Icon className="star" name="left" ref={ iconEl }/></IconButton>
                    </div>
                    <br/>
                    <br/>
                    <Fab>我</Fab>
                    <Fab>H</Fab>
                    <Fab color="primary">我</Fab>
                    <Fab color="secondary">H</Fab>
                    <Fab><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    <Fab color="primary" centerRipple><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    <Fab color="secondary"><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    <Fab color="inherit"><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    <Fab color="secondary" disabled><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    <div>
                        <Fab size="small" color="primary"><Icon className="star" name="left" ref={ iconEl }/></Fab>
                        <Fab size="medium" color="primary" centerRipple><Icon className="star" name="left"
                                                                              ref={ iconEl }/></Fab>
                        <Fab color="primary"><Icon className="star" name="left" ref={ iconEl }/></Fab>
                    </div>
                    <br/>
                    <br/>
                    <Button fullWidth variant="contained" color="secondary" onClick={ toggleTheme }>点击切换主题</Button>
                    <Button fullWidth href="/">世界，你好</Button>
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
                            <Button variant="contained" color="primary"
                                    onClick={ () => setLoading(true) }>世界，你好</Button>
                            <Button variant="contained" color="secondary" onClick={ () => setLoading(false) }><Icon
                                name="setting"/>23434</Button>
                            <Button variant="contained" color="secondary" onClick={ () => setVariant('outlined') }>世界，你好<Icon
                                name="setting"/></Button>
                            <Button variant="contained" color="secondary" onClick={ () => setVariant('contained') }>disabled世界，你好<Icon
                                name="setting"/></Button>
                            <Button disabled variant="contained" color="secondary" loading={ loading }><Icon
                                name="setting"/>世界，你好<Icon
                                name="setting"/></Button>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Button component='div' loading>世界，你好</Button>
                            <Button color="primary" centerRipple>世界，center你好</Button>
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
                            <Button variant="contained" color="primary" size="small" round><Icon
                                name="setting"/>世界，你好</Button>
                            <Button variant="contained" color="primary" size="medium"><Icon
                                name="setting"/>世界，你好</Button>
                            <Button variant="contained" color="primary" size="large" loading>世界，你好</Button>
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
