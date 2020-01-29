import * as React from 'react';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    root: {
        '& > *': {
            margin: '8px !important'
        }
    }
}, { name: 'ContainedButtons' });

export default function ContainedButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Button variant="contained">
                DEFAULT
            </Button>
            <Button variant="contained" color="primary">
                PRIMARY
            </Button>
            <Button variant="contained" color="secondary">
                SECONDARY
            </Button>
            <Button variant="contained" color="secondary" disabled>
                DISABLED
            </Button>
            <Button variant="contained" href="https://xingxinglail.github.io/drug-ui/">
                LINK
            </Button>
        </div>
    );
};
