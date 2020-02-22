import * as React from 'react';
import Button from '@drug-ui/core/Button';
import notification  from '@drug-ui/core/Notification';

export default function Update () {

    const openNotification = () => {
        const key = `open${ Date.now() }`;

        notification.open({
            message: '提示',
            description: '提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案。',
            key
        });

        setTimeout(() => {
            notification.open({
                message: '提示',
                description: '更新后的提示文案。',
                key,
                duration: 1500
            });
        }, 1000);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ openNotification }>
                可以更新内容
            </Button>
        </div>
    );
};
