import * as React from 'react';
import IconButton from '@drug-ui/core/IconButton';
import Button from '@drug-ui/core/Button';
import Fab from '@drug-ui/core/Fab';
import Up from '@drug-ui/icons/Up';
import Setting from '@drug-ui/icons/Setting';
import Close from '@drug-ui/icons/Close';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    margin: 8
}, { name: 'ButtonSizes' });

export default function ButtonSizes () {
    const classes = useStyles();

    return (
        <div>
            <div>
                <Button size="small" className={classes.margin}>
                    SMALL
                </Button>
                <Button size="medium" className={classes.margin}>
                    MEDIUM
                </Button>
                <Button size="large" className={classes.margin}>
                    LARGE
                </Button>
            </div>
            <div>
                <Button variant="outlined" size="small" color="primary" className={classes.margin}>
                    SMALL
                </Button>
                <Button variant="outlined" size="medium" color="primary" className={classes.margin}>
                    MEDIUM
                </Button>
                <Button variant="outlined" size="large" color="primary" className={classes.margin}>
                    LARGE
                </Button>
            </div>
            <div>
                <Button variant="contained" size="small" color="primary" className={classes.margin}>
                    SMALL
                </Button>
                <Button variant="contained" size="medium" color="primary" className={classes.margin}>
                    MEDIUM
                </Button>
                <Button variant="contained" size="large" color="primary" className={classes.margin}>
                    LARGE
                </Button>
            </div>
            <div>
                <Fab size="small" color="secondary" className={classes.margin}>
                    <Close />
                </Fab>
                <Fab size="medium" color="secondary" className={classes.margin}>
                    <Setting />
                </Fab>
                <Fab color="secondary" className={classes.margin}>
                    <Up />
                </Fab>
            </div>
            <div>
                <IconButton size="small" className={classes.margin}>
                    <Close />
                </IconButton>
                <IconButton size="medium" className={classes.margin}>
                    <Setting />
                </IconButton>
                <IconButton color="secondary" className={classes.margin}>
                    <Up />
                </IconButton>
            </div>
        </div>
    );
};
