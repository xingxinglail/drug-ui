import * as React from 'react';
import * as enzyme from 'enzyme';
import Wrapper from './Wrapper';

export const getClasses = (element: React.ReactElement) => {
    // @ts-ignore
    const { useStyles } = element.type;
    let classes;

    function Listener () {
        classes = useStyles();
        return null;
    }

    enzyme.mount(<Wrapper><Listener /></Wrapper>);
    return classes;
};
