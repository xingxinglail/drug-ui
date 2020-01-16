import React from 'react';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    root: {
        '& > *': {
            margin: '8px !important'
        }
    }
}, { name: 'OutlinedButtons' });

export default function OutlinedButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Button variant="outlined">
                DEFAULT
            </Button>
            <Button variant="outlined" color="primary">
                PRIMARY
            </Button>
            <Button variant="outlined" color="secondary">
                SECONDARY
            </Button>
            <Button variant="outlined" color="secondary" disabled>
                DISABLED
            </Button>
            <Button variant="outlined" href="https://xingxinglail.github.io/drug-ui/">
                LINK
            </Button>
        </div>
    );
};
