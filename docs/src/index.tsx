import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import { Rule, StyleSheet } from 'jss';
import {
    Fab,
    Button,
    ButtonGroup,
    IconButton,
    SvgIcon,
    ThemeProvider,
    Layout,
    Dialog,
    Form,
    Input,
    FormField,
    ScrollBar,
    Menu,
    Collapse
} from '@drug-ui/core';
import { Rule as ValidateRule } from '@drug-ui/core/Form/validate';
import { Variant } from '@drug-ui/core/Button';
// import { Setting, Down, Left, CloseCircleFill } from '../../packages/drug-ui-icons/src';
import { Setting, Down, Left, CloseCircleFill } from '@drug-ui/icons';
import Ripple from '../../packages/drug-ui/src/ButtonBase/Ripple';
import createTheme, { Theme } from '../../packages/drug-ui/src/styles/createTheme';
import { createUseStyles } from 'react-jss';

const { Header, Content, Aside, Footer } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

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

const useStyles = createUseStyles({
    desc: {
        width: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        '&:hover': {
            backgroundColor: 'red'
        }
    },
    alink: {
        textDecoration: 'none',
        '&::before': {
            content: '" "',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }
    }
});

const App: React.FC = () => {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const [test, setTest] = React.useState(true);
    const [a, setA] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [variant, setVariant] = React.useState<Variant>('contained');
    const buttonEl = React.useRef(null);
    const iconEl = React.useRef(null);
    const layout = React.useRef(null);
    const input = React.useRef(null);
    const classes = useStyles();
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
    //     console.log(layout);
    // }, [dialogVisible]);
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

    const maskClick = (e: React.MouseEvent) => {
        console.log(e);
        setDialogVisible(false);
    };

    const onEnter = (e: HTMLElement) => {
        console.log(e);
    };

    const onEntered = (e: HTMLElement) => {
        console.log(e);
    };

    const formInitialState = {
        username: '12',
        password: '34',
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(e);
        console.log('input');
        console.log(input);
        console.log(formInitialState);
    };

    const title = <div>Title</div>;

    const validator = (rule: ValidateRule, value: any, callback: (str?: string) => void) => {
        if (value === 'dddddd') {
            setTimeout(() => {
                callback('密码错误');
            }, 500);
        } else {
            setTimeout(() => {
                callback();
            }, 1500);
        }
    };

    const [list, setList] = React.useState<string[]>([]);
    const addList = (e: React.MouseEvent) => {
        console.log(e);
        setList(prevState => {
            return [...prevState, `Some ${ list.length } content`];
        });
    };
    const removeList = () => {
        setList(prevState => {
            prevState.splice(prevState.length - 1, 1);
            return [...prevState];
        });
    };
    const [openIndexes, setOpenIndexes] = React.useState<any[]>(['1']);
    const onTitleClick = (data: { index: string | number, domEvent: React.MouseEvent }) => {
        //console.log(data);
        //setOpenIndexes([...openIndexes, data.index])
    };
    const onOpenChange = (data: any[]) => {
        console.log('onOpenChange');
        console.log(data);
        setOpenIndexes(data);
    };

    const onOpenChange2 = (data: any[]) => {
        console.log('onOpenChange');
        console.log(data);
    };
    const [selectedIndex, setSelectedIndex] = React.useState<string | number>('1-3');
    const onSelectChange = (index: string | number) => {
        console.log('onSelectChange');
        console.log(index);
        setSelectedIndex(index);
    };

    const [collapse, setCollapse] = React.useState(true);
    const [collapse2, setCollapse2] = React.useState(false);
    return (
        <Router>
            <ThemeProvider theme={ theme }>
                <div style={ { padding: '20px' } }>
                    <div onClick={ () => setCollapse(!collapse) }>切换</div>
                    <br />
                    <br />
                    <Collapse in={ collapse } timeout={ 1000 }>
                        <div style={ { width: 200, height: 200, border: '1px solid red', padding: 10 } } />
                    </Collapse>
                    <div onClick={ () => setCollapse2(!collapse2) }>切换</div>
                    <br />
                    <br />
                    <Collapse in={ collapse2 } timeout={ 2000 }>
                        <div style={ { width: 200, height: 200, border: '1px solid red', padding: 10 } } />
                    </Collapse>
                </div>
                <div style={ { width: 300, padding: '200px 16px 0 40px' } }>
                    <h2>不受控组件</h2>
                    <Menu defaultOpenIndexes={ ['1', '2'] } defaultSelectedIndex="1-3">
                        <span>123</span>
                        <SubMenu index="1" title="Components（组件）" onTitleClick={ onTitleClick }>
                            <MenuItem index="1-1"><Link className={ classes.alink } to="/api/dialog">Dialog
                                API</Link></MenuItem>
                            <MenuItem index="1-2">Layout</MenuItem>
                            <MenuItem index="1-3">ScrollBar</MenuItem>
                            <MenuItem index="1-4">Dialog</MenuItem>
                            <SubMenu index="1-1-1" title="Inner Components（组件）" onTitleClick={ onTitleClick }>
                                <MenuItem index="1-1-1-1">Button</MenuItem>
                                <MenuItem index="1-1-1-2">Layout</MenuItem>
                                <MenuItem index="1-1-1-3">ScrollBar</MenuItem>
                                <MenuItem index="1-1-1-4">Dialog</MenuItem>
                                <SubMenu index="333" title="Inner Components（组件）" onTitleClick={ onTitleClick }>
                                    <MenuItem index="333-1">Button</MenuItem>
                                    <SubMenu index="444" title="Inner Components（组件）" onTitleClick={ onTitleClick }>
                                        <MenuItem index="444-1">Button</MenuItem>
                                        <SubMenu index="555" title="Inner Components（组件）" onTitleClick={ onTitleClick }>
                                            <MenuItem index="555-1">Button</MenuItem>
                                        </SubMenu>
                                    </SubMenu>
                                </SubMenu>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu index="2" title="Components API" onTitleClick={ onTitleClick }>
                            <MenuItem index="2-1">ButtonBase</MenuItem>
                            <MenuItem index="2-2">Fab</MenuItem>
                            <MenuItem index="2-3">IconButton</MenuItem>
                            <MenuItem index="2-4">Dialog</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div style={ { width: 240, padding: '200px 16px 216px 40px' } }>
                    <h2>受控组件</h2>
                    <Menu
                        defaultOpenIndexes={ ['1', '2'] }
                        openIndexes={ openIndexes }
                        onOpenChange={ onOpenChange }
                        selectedIndex={ selectedIndex }
                        onSelectChange={ onSelectChange }>
                        1
                        <span>123</span>
                        <SubMenu index="1" title="Components（组件）" onTitleClick={ onTitleClick }>
                            <MenuItem index="1-1">Button</MenuItem>
                            <MenuItem index="1-2">Layout</MenuItem>
                            <MenuItem index="1-3">ScrollBar</MenuItem>
                            <MenuItem index="1-4">Dialog</MenuItem>
                            <SubMenu index="1-1-1" title="Inner Components（组件）" onTitleClick={ onTitleClick }>
                                <MenuItem index="1-1-1-1">Button</MenuItem>
                                <MenuItem index="1-1-1-2">Layout</MenuItem>
                                <MenuItem index="1-1-1-3">ScrollBar</MenuItem>
                                <MenuItem index="1-1-1-4">Dialog</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu index="2" title="Components API" onTitleClick={ onTitleClick }>
                            <MenuItem index="2-1">ButtonBase</MenuItem>
                            <MenuItem index="2-2">Fab</MenuItem>
                            <MenuItem index="2-3">IconButton</MenuItem>
                            <MenuItem index="2-4">Dialog</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div style={ { padding: '16px' } }>
                    <ButtonGroup variant="contained" color="primary">
                        <Button className="sdfsdf">添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                        <Button>添加</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup variant="contained" color="secondary">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                        <Button>添加</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup variant="contained">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                        <Button>添加</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup variant="outlined" color="primary">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup variant="outlined" color="secondary">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup variant="outlined">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup color="primary">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup color="secondary">
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                    <br />
                    <br />
                    <ButtonGroup>
                        <Button>添加</Button>
                        <Button>删除</Button>
                        <Button>删除</Button>
                    </ButtonGroup>
                </div>
                <div style={ { padding: '16px' } }>
                    <div style={ {
                        width: '400px',
                        height: '300px',
                        border: '1px solid red',
                        boxSizing: 'border-box',
                        overflow: 'scroll'
                    } }>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                        <p style={ { lineHeight: '50px' } }>Some content</p>
                    </div>
                </div>
                <div style={ { padding: '16px' } }>
                    <ScrollBar
                        autoHide={ false }
                        style={ { height: '300px', border: '1px solid red', boxSizing: 'border-box' } }>
                        <div id="test">
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p className={ classes.desc } style={ {
                                lineHeight: '50px',
                            } }>阿卡丽的接口拉时间段圣诞快乐个减肥克鲁赛德加工费拉克丝解放路可使肌肤的了跨世纪东方克鲁赛德</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            {
                                list.map(c => <p key={ c } style={ { lineHeight: '40px' } }>{ c }</p>)
                            }
                            <p style={ { lineHeight: '40px' } }>Last content</p>
                        </div>
                    </ScrollBar>
                    <Button variant="contained" color="primary" onClick={ addList }>添加</Button>
                    <Button variant="contained" color="secondary" onClick={ removeList }>删除</Button>
                </div>
                <div style={ { padding: '16px' } }>
                    <ScrollBar
                        style={ { height: '300px', border: '1px solid red', boxSizing: 'border-box' } }>
                        <div id="test">
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p className={ classes.desc } style={ {
                                lineHeight: '50px',
                            } }>阿卡丽的接口拉时间段圣诞快乐个减肥克鲁赛德加工费拉克丝解放路可使肌肤的了跨世纪东方克鲁赛德</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            <p style={ { lineHeight: '50px' } }>Some content</p>
                            {
                                list.map(c => <p key={ c } style={ { lineHeight: '40px' } }>{ c }</p>)
                            }
                            <p style={ { lineHeight: '40px' } }>Last content</p>
                        </div>
                    </ScrollBar>
                    <Button variant="contained" color="primary" onClick={ addList }>添加</Button>
                    <Button variant="contained" color="secondary" onClick={ removeList }>删除</Button>
                </div>
                <div style={ { padding: '16px' } }>
                    <Input label="姓名" defaultValue="" value="" placeholder="水电费水电费" />
                    <Input label="姓名" error placeholder="水电费水电费" />
                    <FormField>
                        <Input label="姓名" defaultValue="" value="jhh" placeholder="水电费水电费" />
                    </FormField>
                </div>
                <div style={ { padding: 60 } }>
                    <Form initialState={ formInitialState } onSubmit={ onSubmit }>
                        <div>1</div>
                        <span>2</span>

                        &nbsp;
                        1
                        <FormField name="username" rules={ [
                            {
                                required: true, message: '请输入用户名！'
                            },
                            {
                                validator: validator
                            },
                            {
                                min: 6, max: 10, message: '长度在6-10之间'
                            }
                        ] }>
                            <Input ref={ input } label="用户名" placeholder="用户名" />
                        </FormField>
                        <FormField name="password" rules={ [
                            {
                                required: true, message: '请输入密码！'
                            },
                            {
                                min: 6, max: 8, message: '长度在6-8之间'
                            }
                        ] }>
                            <Input label="密码" placeholder="密码" />
                        </FormField>
                        <br />
                        <Button variant="contained" color="primary">提交</Button>
                    </Form>
                </div>
                ;
                <Button variant="contained" color="secondary" onClick={ () => setDialogVisible(true) }>打开
                    Dialog</Button>;
                <Button variant="contained" color="secondary" onClick={ () => setTest(!test) }>卸载 Dialog</Button>;
                {/*<Dialog*/ }
                {/*    ref={ layout }*/ }
                {/*    title="confirm"*/ }
                {/*    maskClosable={ false }*/ }
                {/*    closable={ false }*/ }
                {/*    footer={*/ }
                {/*        <>*/ }
                {/*            <Button color="secondary" onClick={ () => setDialogVisible(false) }>删除</Button>*/ }
                {/*            <Button color="primary" onClick={ () => setDialogVisible(false) }>确定</Button>*/ }
                {/*        </>*/ }
                {/*    }*/ }
                {/*    onClose={ maskClick }>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue*/ }
                {/*        laoreet rutrum faucibus dolor auctor.</p>*/ }
                {/*    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl*/ }
                {/*        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue*/ }
                {/*        laoreet rutrum faucibus dolor auctor.</p>*/ }
                {/*    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl*/ }
                {/*        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue*/ }
                {/*        laoreet rutrum faucibus dolor auctor.</p>*/ }
                {/*    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl*/ }
                {/*        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue*/ }
                {/*        laoreet rutrum faucibus dolor auctor.</p>*/ }
                {/*    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl*/ }
                {/*        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue*/ }
                {/*        laoreet rutrum faucibus dolor auctor.</p>*/ }
                {/*    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl*/ }
                {/*        consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>*/ }
                {/*    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas*/ }
                {/*        eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>*/ }
                {/*</Dialog>*/ }
                { !test ? null :
                    <Dialog
                        title={ title }
                        keepMounted
                        visible={ dialogVisible }
                        footer={
                            <>
                                <Button color="secondary" onClick={ () => setDialogVisible(false) }>删除</Button>
                                <Button color="primary" onClick={ () => setDialogVisible(false) }>确定</Button>
                            </>
                        }
                        transitionDuration={ { enter: 300, exit: 300 } }
                        onClose={ maskClick }>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                            egestas
                            eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
                            vel
                            augue
                            laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque
                            nisl
                            consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Dialog>
                }

                <Layout>333</Layout>;
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Aside>Aside</Aside>
                        <Content>Content</Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>;
                <Layout className="asd">
                    <Header className="asd">Header</Header>
                    <Layout className="asd">
                        <Content className="asd">Content</Content>
                        <Aside className="asd">Aside</Aside>
                    </Layout>
                    <Footer className="asd">Footer</Footer>
                </Layout>;
                <Layout>
                    <Aside width={ 400 }>Aside</Aside>
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>;
                <Button component={ Test }>你好，Test世界<Button component="div"
                                                            href="https://google.com">你好，link世界</Button></Button>;
                <Button onMouseDown={ onMouseDown }>你好，link世界</Button>;
                <Button component="div" href="https://google.com">你好，link世界</Button>;
                <Fab className="aaa">阿</Fab>;
                <SvgIcon className="bbb" htmlColor="red" titleAccess="svg">1</SvgIcon>;
                <SvgIcon className="bbb" htmlColor="red">
                    <path
                        d="M588.29605827 512l386.63543046-460.8694331c6.48074626-7.65906378 1.03102783-19.2949491-8.98467096-19.29494909h-117.53717085c-6.92261532 0-13.55065127 3.09308345-18.11663159 8.3955122L511.41084125 420.38581419 192.52866718 40.23113001c-4.41869063-5.30242877-11.04672658-8.3955122-18.1166316-8.3955122H56.87486474c-10.01569877 0-15.46541722 11.63588534-8.98467098 19.29494909L434.52562421 512 47.89019376 972.8694331c-6.48074626 7.65906378-1.03102783 19.2949491 8.98467098 19.29494909h117.53717084c6.92261532 0 13.55065127-3.09308345 18.1166316-8.3955122l318.88217407-380.15468418 318.88217408 380.15468418c4.41869063 5.30242877 11.04672658 8.3955122 18.11663159 8.3955122h117.53717085c10.01569877 0 15.46541722-11.63588534 8.98467096-19.29494909L588.29605827 512z" />
                </SvgIcon>;
                <Setting ref={ iconEl } className="ccc" />;
                <CloseCircleFill className="ccc" />;
                <Down />;
                <IconButton className="bbb"><Down htmlColor="red" /></IconButton>;
                <Left />;
                <CloseCircleFill />;
                <div onClick={ () => setTest(!test) }>{ test ? '点击隐藏' : '点击显示' }</div>;
                <br />;
                <Button className="aaaa">你好，世界</Button>;
                <Button color="primary" size="small">你好，世界</Button>;
                <Button color="secondary">你好，世界</Button>;
                <br />;
                <Button variant="contained" style={ { opacity: 0.8 } }>你好，世界</Button>;
                <Button variant="contained" color="primary">你好，世界</Button>;
                <Button variant="contained" color="secondary">你好，世界</Button>;
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
        </Router>
    );
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
