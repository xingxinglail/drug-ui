import * as React from 'react';
import { useHistory } from 'react-router';

export default function MarkdownLinks () {
    const history = useHistory();
    const handleClick = React.useCallback((event: MouseEvent) => {
        const activeElement = document.activeElement;

        if (
            activeElement!.nodeName !== 'A' ||
            activeElement!.getAttribute('renderer-link') === null
        ) {
            return;
        }
        event.preventDefault();
        history.push(activeElement!.getAttribute('href')!);
    }, []);

    React.useEffect(() => {
        document.addEventListener('click', handleClick);
    }, []);

    return null;
}
