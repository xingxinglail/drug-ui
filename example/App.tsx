import React, { FC, MouseEventHandler, useState } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button } from '../components';

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
                    a ? <Button>你好，世界</Button> : '6777'
                }
            </div>
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
