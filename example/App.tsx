import React, { FC, MouseEventHandler, useState } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../components';
import Button, { ButtonProps } from '../components/button/Index';

const Test = React.forwardRef<HTMLAnchorElement, ButtonProps>((props, ref) => {
    const { children, ...rest } = props;
    return <a href="https://baidu.com" ref={ ref } { ...rest }>{ children }</a>;
});

const App: FC = () => {
    const [a, setA] = useState(true);
    const click: MouseEventHandler = () => {
        console.log(333);
        setA(true);
    };

    const enter: MouseEventHandler = (e) => {
        setA(false);
    };

    const level: MouseEventHandler = (e) => {
        console.log(e.target);
    };
    return (
        <div>
            <Icon className="star" name="left" onClick={ click }/>
            <Icon name="down" onMouseEnter={ enter }/>
            <Icon name="right" onMouseLeave={ level }/>
            <br/>
            <div style={ { padding: 40 } }>
                {
                    a ? <Button component={ Test }>你好，世界</Button> : '6777'
                }
                <Button fullWidth href="/">世界，你好</Button>
                <Button fullWidth>世界，你好</Button>
                <br/>
                <br/>
                <br/>
                <div>
                    <Button variant="contained">世界，你好</Button>
                    <Button variant="contained" color="primary">世界，你好</Button>
                    <Button variant="contained" color="secondary">世界，你好</Button>
                    <Button disabled variant="contained" color="secondary">世界，你好</Button>
                    <Button variant="contained" color="secondary">世界，你好</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <Button>世界，你好</Button>
                    <Button color="primary">世界，你好</Button>
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
                    <Button size="medium">世界，你好</Button>
                    <Button size="large">世界，你好</Button>
                </div>
                <br/>
                <div>
                    <Button variant="outlined" color="primary" size="small" round>世界，你好</Button>
                    <Button variant="outlined" color="primary" size="medium">世界，你好</Button>
                    <Button variant="outlined" color="primary" size="large">世界，你好</Button>
                </div>
                <br/>
                <div>
                    <Button variant="contained" color="primary" size="small" round><Icon name="setting" />世界，你好</Button>
                    <Button variant="contained" color="primary" size="medium"><Icon name="setting" />世界，你好</Button>
                    <Button variant="contained" color="primary" size="large">世界，你好<Icon name="setting" /></Button>
                </div>
                <br/>
                <div>
                    <Button variant="fab" color="primary" size="small"><Icon name="setting" /></Button>
                    <Button variant="fab" color="secondary" size="medium">界</Button>
                    <Button variant="fab" color="primary" size="large">你</Button>
                    <Button variant="fab" color="primary" disabled size="large">好</Button>
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
