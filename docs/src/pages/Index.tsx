import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@drug-ui/core/Button';

const Index = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/getting-started/installation');
    };

    return <Button variant="outlined" color="primary" onClick={ handleClick }>Get Started</Button>;
};

export default Index;
