import * as React from 'react';
interface DemoProps {
    demo: {
        tsx: () => React.ReactElement;
        raw: string;
        rawTS: string;
    };
}
declare const Demo: React.FC<DemoProps>;
export default Demo;
