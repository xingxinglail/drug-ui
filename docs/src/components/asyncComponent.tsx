import * as React from 'react';
import * as NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

const asyncComponent = (importComponent: () => Promise<{ default: () => React.ReactElement }>) => {

    const AsyncComponent: React.FC = (props) => {
        const [Component, setComponent] = React.useState<React.ReactElement | null>(null);
        React.useEffect(() => {
            (async () => {
                try {
                    NProgress.start();
                    const res = await importComponent();
                    setComponent(res.default());
                    NProgress.done();
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
