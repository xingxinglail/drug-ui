import { NotificationProps } from './Notification';
export * from './Notification';
export interface Config extends Omit<NotificationProps, 'visible' | 'onClose'> {
    key?: string;
    onClose?: () => void;
}
export interface NotificationApi {
    open: (config: Config) => void;
    close: (key: string) => void;
    destroy: () => void;
    success: (config: Config) => void;
    info: (config: Config) => void;
    error: (config: Config) => void;
    warning: (config: Config) => void;
    warn: (config: Config) => void;
}
declare const _default: NotificationApi;
export default _default;
