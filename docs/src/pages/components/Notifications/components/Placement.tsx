import * as React from 'react';
import Button from '@drug-ui/core/Button';
import notification, { NotificationPlacement } from '@drug-ui/core/Notification';

import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    margin: {
        margin: '8px !important'
    }
}, { name: 'NotificationPlacement' });

export default function Placement () {
    const classes = useStyles();

    const openNotification = (placement: NotificationPlacement) => {
        notification.open({
            message: '提示',
            description: '提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案。',
            placement
        });
    };

    return (
        <div>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('topLeft') }>
                左上角
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('topRight') }>
                右上角
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('bottomLeft') }>
                左下角
            </Button>
            <Button className={ classes.margin } variant="contained" color="primary" onClick={ () => openNotification('bottomRight') }>
                右下角
            </Button>
        </div>
    );
};
