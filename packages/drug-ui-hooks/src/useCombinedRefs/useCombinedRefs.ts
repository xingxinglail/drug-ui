import * as React from 'react';

type OptionalRef<T> = React.Ref<T> | null;

function useCombinedRefs<T> (...refs: Array<OptionalRef<T>>): React.Ref<T> {
    const targetRef = React.useRef<T>(null);

    React.useLayoutEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                (ref as React.MutableRefObject<T | null>).current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}

export default useCombinedRefs;
