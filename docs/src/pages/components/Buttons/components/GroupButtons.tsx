import * as React from 'react';
import Button from '@drug-ui/core/Button';
import ButtonGroup from '@drug-ui/core/ButtonGroup';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: 8,
        }
    }
}, { name: 'GroupButtons' });

export default function GroupButtons () {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <ButtonGroup variant="outlined" color="primary">
                <Button>ONE</Button>
                <Button>TWO</Button>
                <Button>THREE</Button>
            </ButtonGroup>
            <ButtonGroup variant="contained" color="primary">
                <Button>ONE</Button>
                <Button>TWO</Button>
                <Button>THREE</Button>
            </ButtonGroup>
            <ButtonGroup color="primary">
                <Button>ONE</Button>
                <Button>TWO</Button>
                <Button>THREE</Button>
            </ButtonGroup>
        </div>
    );
};
