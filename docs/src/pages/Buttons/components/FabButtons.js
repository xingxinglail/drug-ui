import React from 'react';
import Fab from '@drug-ui/core/Fab';
import { createUseStyles } from '@drug-ui/styles';
import Up from '@drug-ui/icons/Up';
import Setting from '@drug-ui/icons/Setting';
import Close from '@drug-ui/icons/Close';

const useStyles = createUseStyles({
    root: {
        '& > *': {
            margin: '8px !important'
        }
    }
}, { name: 'FabButtons' });

export default function FabButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Fab color="primary">
                <Close />
            </Fab>
            <Fab color="secondary">
                <Setting />
            </Fab>
            <Fab>
                <Up />
            </Fab>
            <Fab color="secondary" disabled>
                <Setting />
            </Fab>
        </div>
    );
};
