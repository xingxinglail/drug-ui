import * as React from 'react';
import Button from '@drug-ui/core/Button';
import notification, { NotificationType } from '@drug-ui/core/Notification';

import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    margin: {
        margin: '8px !important'
    }
}, { name: 'NotificationType' });

export default function Type () {
    const classes = useStyles();

    const openNotification = (type: NotificationType) => {
        notification[type]({
            message: '提示',
            description: '提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案。'
        });
    };

    return (
        <div>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('success') }>
                成功
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('warning') }>
                警告
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('info') }>
                消息
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('error') }>
                错误
            </Button>
        </div>
    );
};
