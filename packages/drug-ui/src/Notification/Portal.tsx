import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getNodeFromSelector } from './util';

export interface PortalProps {
    selector: string | HTMLElement;
}

export const name = 'Portal';

const Portal: React.FC<PortalProps> = props => {
    const { selector, children } = props;
    const node = getNodeFromSelector(selector);
    if (!node) return node;
    return ReactDOM.createPortal(children, node);
};

Portal.displayName = name;

export default Portal;
