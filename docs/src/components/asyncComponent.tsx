import * as React from 'react';

const asyncComponent = (importComponent: () => Promise<{ default: () => React.ReactElement }>) => {

    const AsyncComponent: React.FC = (props) => {
        const [Component, setComponent] = React.useState<React.ReactElement | null>(null);
        React.useEffect(() => {
            (async () => {
                try {
                    const res = await importComponent();
                    setComponent(res.default());
                } catch (err) {
                    console.error(err);
                }
            })();
        }, []);
        return Component;
    };
    return AsyncComponent;
};

export default asyncComponent;
