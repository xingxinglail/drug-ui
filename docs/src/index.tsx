import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rule, StyleSheet } from 'jss';
import { Variant } from '@drug-ui/core/Button';
import { Fab, Button, IconButton, SvgIcon, ThemeProvider, Layout } from '@drug-ui/core';
// import { Setting, Down, Left, CloseCircleFill } from '../../packages/drug-ui-icons/src';
import { Setting, Down, Left, CloseCircleFill } from '@drug-ui/icons';
import Ripple from '../../packages/drug-ui/src/ButtonBase/Ripple';
import createTheme, { Theme } from '../../packages/drug-ui/src/styles/createTheme';

const { Header, Content, Aside, Footer } = Layout;

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    cc?: string;
}

const Test: React.FC<Props> = React.forwardRef<HTMLAnchorElement, Props>((props, ref) => {
    const { children, ...rest } = props;
    return <a ref={ ref } cc="66" href="https://baidu.com" { ...rest }>{ children }</a>;
});

// const Test: React.FC = ((props) => {
//     const { children, ...rest } = props;
//     return <a href="https://baidu.com" { ...rest }>{ children }</a>;
// });

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

    const onMouseDown = () => {
        console.log(111);
    };

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
            <Layout>333</Layout>
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Aside>Aside</Aside>
                    <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
            <Layout className="asd">
                <Header className="asd">Header</Header>
                <Layout className="asd">
                    <Content className="asd">Content</Content>
                    <Aside className="asd">Aside</Aside>
                </Layout>
                <Footer className="asd">Footer</Footer>
            </Layout>
            <Layout>
                <Aside width={ 400 }>Aside</Aside>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
            <Button component={ Test }>你好，Test世界<Button component="div" href="https://google.com">你好，link世界</Button></Button>
            <Button onMouseDown={ onMouseDown }>你好，link世界</Button>
            <Button component="div" href="https://google.com">你好，link世界</Button>
            <Fab className="aaa">阿</Fab>
            <SvgIcon className="bbb" htmlColor="red">1</SvgIcon>
            <SvgIcon className="bbb" htmlColor="red">
                <path d="M588.29605827 512l386.63543046-460.8694331c6.48074626-7.65906378 1.03102783-19.2949491-8.98467096-19.29494909h-117.53717085c-6.92261532 0-13.55065127 3.09308345-18.11663159 8.3955122L511.41084125 420.38581419 192.52866718 40.23113001c-4.41869063-5.30242877-11.04672658-8.3955122-18.1166316-8.3955122H56.87486474c-10.01569877 0-15.46541722 11.63588534-8.98467098 19.29494909L434.52562421 512 47.89019376 972.8694331c-6.48074626 7.65906378-1.03102783 19.2949491 8.98467098 19.29494909h117.53717084c6.92261532 0 13.55065127-3.09308345 18.1166316-8.3955122l318.88217407-380.15468418 318.88217408 380.15468418c4.41869063 5.30242877 11.04672658 8.3955122 18.11663159 8.3955122h117.53717085c10.01569877 0 15.46541722-11.63588534 8.98467096-19.29494909L588.29605827 512z" />
            </SvgIcon>
            <Setting ref={ iconEl } className="ccc" />
            <CloseCircleFill className="ccc" />
            <Down />
            <IconButton className="bbb"><Down htmlColor="red" /></IconButton>
            <Left />
            <CloseCircleFill />
            <div onClick={ () => setTest(!test) }>{ test ? '点击隐藏' : '点击显示' }</div>
            <br />
            <Button className="aaaa">你好，世界</Button>
            <Button color="primary" size="small">你好，世界</Button>
            <Button color="secondary">你好，世界</Button>
            <br />
            <Button variant="contained" style={{ opacity: 0.8 }}>你好，世界</Button>
            <Button variant="contained" color="primary">你好，世界</Button>
            <Button variant="contained" color="secondary">你好，世界</Button>
            { test ? (
                <>
                    <br />
                    <IconButton>我</IconButton>
                    <IconButton>H</IconButton>
                    <IconButton color="primary">我</IconButton>
                    <IconButton color="secondary">H</IconButton>
                    <IconButton><Left /></IconButton>
                    <IconButton color="primary" centerRipple><Left /></IconButton>
                    <IconButton color="secondary"><Left /></IconButton>
                    <IconButton color="inherit"><Left /></IconButton>
                    <IconButton color="secondary" disabled><Left /></IconButton>
                    <div>
                        <IconButton size="small" color="primary"><Left /></IconButton>
                        <IconButton size="medium" color="primary" centerRipple><Left /></IconButton>
                        <IconButton color="primary"><Left /></IconButton>
                    </div>
                    <br />
                    <br />
                    <Fab>我</Fab>
                    <Fab>H</Fab>
                    <Fab color="primary">我</Fab>
                    <Fab color="secondary">H</Fab>
                    <Fab><Left /></Fab>
                    <Fab color="primary" centerRipple><Left /></Fab>
                    <Fab color="secondary"><Left /></Fab>
                    <Fab color="inherit"><Left /></Fab>
                    <Fab color="secondary" disabled><Left /></Fab>
                    <div>
                        <Fab size="small" color="primary"><Left /></Fab>
                        <Fab size="medium" color="primary" centerRipple><Setting></Setting></Fab>
                        <Fab color="primary"><Left /></Fab>
                    </div>
                    <br />
                    <br />
                    <Button fullWidth variant="contained" color="secondary" onClick={ toggleTheme }>点击切换主题</Button>
                    <Button fullWidth href="/">世界，你好</Button>
                    <Left />
                    <Left />
                    <Left />
                    <br />
                    <div style={ { padding: 40 } }>
                        {
                            a ? <Button component={ Test }>你好，Test世界</Button> : '6777'
                        }
                        <Button fullWidth href="/">世界，你好</Button>
                        <Button fullWidth onClick={ (e) => click(e) }>世界，你好</Button>
                        <br />
                        <br />
                        <br />
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
                        <br />
                        <br />
                        <div>
                            <Button component='div'>世界，你好</Button>
                            <Button color="primary" centerRipple>世界，center你好</Button>
                            <Button color="secondary">世界，你好</Button>
                            <Button disabled color="secondary">世界，你好</Button>
                            <Button color="secondary">世界，你好</Button>
                        </div>
                        <br />
                        <br />
                        <div>
                            <Button variant="outlined">世界，你好</Button>
                            <Button variant="outlined" color="primary">世界，你好</Button>
                            <Button variant="outlined" color="secondary">世界，你好</Button>
                            <Button variant="outlined" disabled color="secondary">世界，你好</Button>
                            <Button variant="outlined" color="secondary">世界，你好</Button>
                            <Button variant="outlined" color="inherit">世界，你好</Button>
                        </div>
                        <br />
                        <br />
                        <div>
                            <Button size="small" round>世界，你好</Button>
                            <Button size="medium" color="primary">世界，你好</Button>
                            <Button size="large" color="secondary">世界，你好</Button>
                        </div>
                        <br />
                        <div>
                            <h1>Size</h1>
                            <Button variant="outlined" color="primary" size="small" round>世界，你好</Button>
                            <Button variant="outlined" color="primary" size="medium">世界，你好</Button>
                            <Button variant="outlined" color="primary" size="large">
                                <div>66</div>
                                <Setting />
                            </Button>
                            <Button variant="outlined" color="primary" size="large">{ a }</Button>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" size="small" round>世界，你好</Button>
                            <Button variant="contained" color="primary" size="medium">世界，你好</Button>
                            <Button variant="contained" color="primary" size="large">世界，你好</Button>
                        </div>
                        <br />
                    </div>
                </>
            ) : null }
        </ThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
