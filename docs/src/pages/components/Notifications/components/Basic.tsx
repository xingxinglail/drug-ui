import * as React from 'react';
import Button from '@drug-ui/core/Button';
import notification from '@drug-ui/core/Notification';

import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    margin: {
        margin: '8px !important'
    }
}, { name: 'NotificationBasic' });

export default function Basic () {
    const classes = useStyles();

    const openNotification = () => {
        notification.open({
            message: '提示',
            description: '提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案。'
        });
    };

    const openNotification2 = () => {
        notification.open({
            message: '提示',
            description: '这是一条不会自动关闭的消息。',
            onClick (e: React.MouseEvent) {
                console.log(e);
            }
        });
    };

    return (
        <div>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ openNotification }>
                可自动关闭
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ openNotification2 }>
                不会自动关闭
            </Button>
        </div>
    );
};
