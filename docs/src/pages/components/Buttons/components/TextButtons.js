import React from 'react';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    root: {
        '& > *': {
            margin: '8px !important'
        }
    }
}, { name: 'TextButtons' });

export default function TextButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Button>
                DEFAULT
            </Button>
            <Button color="primary">
                PRIMARY
            </Button>
            <Button color="secondary">
                SECONDARY
            </Button>
            <Button color="secondary" disabled>
                DISABLED
            </Button>
            <Button href="https://xingxinglail.github.io/drug-ui/">
                LINK
            </Button>
        </div>
    );
};
