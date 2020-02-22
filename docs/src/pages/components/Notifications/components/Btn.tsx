import * as React from 'react';
import Button from '@drug-ui/core/Button';
import notification  from '@drug-ui/core/Notification';

export default function Btn () {

    const openNotification = () => {
        const key = `open${ Date.now() }`;
        const btn = (
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={ () => notification.close(key) }>
                确定
            </Button>
        );

        notification.open({
            message: '提示',
            description: '提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案提示文案。',
            key,
            btn,
            onClose () {
                console.log('notification关闭了');
            }
        });
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={ openNotification }>
                自定义按钮
            </Button>
        </div>
    );
};
