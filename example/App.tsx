import React, { FC, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../components';

const App: FC = () => {
    const click: MouseEventHandler = () => {
        console.log(333);
    };

    const enter: MouseEventHandler = (e) => {
        console.log(e.target);
    };

    const level: MouseEventHandler = (e) => {
        console.log(e.target);
    };
    return (
        <div>
            <Icon className="star" name="left" onClick={ click } />
            <Icon name="down" onMouseEnter={ enter } />
            <Icon name="right" onMouseLeave={ level } />
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
