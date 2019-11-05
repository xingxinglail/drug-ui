import React, { FC, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import Index from './icon/Index';

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
            <Index className="star" name="left" onClick={ click } />
            <Index name="down" onMouseEnter={ enter } />
            <Index name="right" onMouseLeave={ level } />
        </div>
    );
};

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
