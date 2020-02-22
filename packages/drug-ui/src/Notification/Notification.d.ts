import * as React from 'react';
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type NotificationType = 'success' | 'info' | 'error' | 'warning';
export interface NotificationProps {
    visible: boolean;
    message: string | React.ReactNode;
    description: string | React.ReactNode;
    onClose: () => void;
    placement?: NotificationPlacement;
    duration?: number;
    style?: React.CSSProperties;
    btn?: React.ReactNode;
    readonly type?: NotificationType;
    icon?: React.ReactNode;
    closeIcon?: React.ReactNode;
    getContainer?: () => Element;
    top?: number;
    bottom?: number;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}
export declare const name = "Notification";
declare const Notification: React.FC<NotificationProps>;
export default Notification;
