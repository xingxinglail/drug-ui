import React from 'react';
import { createUseStyles } from '@drug-ui/styles';
import Up from '@drug-ui/icons/Up';
import Setting from '@drug-ui/icons/Setting';
import Close from '@drug-ui/icons/Close';
import { IconButton } from '@drug-ui/core';
import { Left } from '@drug-ui/icons';

const useStyles = createUseStyles({
    root: {
        '& > *': {
            margin: '8px !important'
        }
    }
}, { name: 'IconButtons' });

export default function IconButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <IconButton color="primary">
                <Close />
            </IconButton>
            <IconButton color="secondary">
                <Setting />
            </IconButton>
            <IconButton>
                <Up />
            </IconButton>
            <IconButton color="primary" disabled>
                <Left />
            </IconButton>
        </div>
    );
};
