import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Header.style';
import { createUseStyles } from '../styles';
import { LayoutProps } from './Layout';

type LayoutClassProps = 'root';

const name = 'LayoutHeader';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

const Header: React.FC<LayoutProps> = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        className
    );

    return (
        <header
            className={ classNames }
            ref={ ref }
            { ...rest }>
            { children }
        </header>
    );
});

Header.displayName = name;

export default Header;
