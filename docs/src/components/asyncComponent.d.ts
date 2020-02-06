import * as React from 'react';
declare const asyncComponent: (importComponent: () => Promise<{
    default: () => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
}>) => React.FC<{}>;
export default asyncComponent;
