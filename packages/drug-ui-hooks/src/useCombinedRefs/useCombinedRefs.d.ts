import * as React from 'react';
declare type OptionalRef<T> = React.Ref<T> | null;
declare function useCombinedRefs<T>(...refs: Array<OptionalRef<T>>): React.Ref<T>;
export default useCombinedRefs;
