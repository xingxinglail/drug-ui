import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Footer.style';
import { createUseStyles } from '../styles';
import { LayoutProps } from './Layout';

type LayoutClassProps = 'root';

const name = 'LayoutFooter';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

const Footer: React.FC<LayoutProps> = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        className
    );

    return (
        <footer
            className={ classNames }
            ref={ ref }
            { ...rest }>
            { children }
        </footer>
    );
});

Footer.displayName = name;

export default Footer;
