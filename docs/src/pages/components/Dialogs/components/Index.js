import React from 'react';
import Dialog from '@drug-ui/core/Dialog';
import Button from '@drug-ui/core/Button';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    margin: {
        marginRight: 8
    }
}, { name: 'Dialog', index: 0 });

export default function DialogDemo () {
    const [visible, setVisible] = React.useState(false);
    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ () => setVisible(true) }>Open Dialog</Button>
            <Dialog
                visible={ visible }
                title="Basic Modal"
                footer={
                    <>
                        <Button className={ classes.margin } variant="outlined" onClick={ () => setVisible(false) }>取消</Button>
                        <Button variant="contained" color="primary" onClick={ () => setVisible(false) }>确定</Button>
                    </>
                }
                onClose={ () => setVisible(false) }>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Dialog>
        </div>
    );
};
