import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Content.style';
import { createUseStyles } from '../styles';
import { LayoutProps } from './Layout';

type LayoutClassProps = 'root';

const name = 'LayoutContent';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

const Content: React.FC<LayoutProps> = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        className
    );

    return (
        <main
            className={ classNames }
            ref={ ref }
            { ...rest }>
            { children }
        </main>
    );
});

Content.displayName = name;

export default Content;
