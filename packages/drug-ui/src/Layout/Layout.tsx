import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Layout.style';
import { createUseStyles } from '../styles';
import Header from './Header';
import Content from './Content';
import Aside, { AsideProps } from './Aside';
import Footer from './Footer';

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
}

type LayoutClassProps = 'root' | 'hasAside';

const name = 'Layout';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757
export interface LayoutComponent extends React.ForwardRefExoticComponent<LayoutProps & React.RefAttributes<HTMLDivElement>> {
    Header: React.FC<LayoutProps>;
    Content: React.FC<LayoutProps>;
    Aside: React.FC<AsideProps>;
    Footer: React.FC<LayoutProps>;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
    const { className, children, ...rest } = props;
    const classes = useStyles();

    let hasAside = false;
    if (children !== undefined && children !== null) {
        let _children: React.ReactElement[] = [];
        Array.isArray(children) ? _children = (children as React.ReactElement[]) : _children.push(children as React.ReactElement);
        hasAside = (_children as React.ReactElement[]).some(node => {
            return node.type === Aside;
        });
    }

    const classNames = classnames(
        classes.root,
        { [classes.hasAside]: hasAside },
        className
    );

    return (
        <section
            className={ classNames }
            ref={ ref }
            { ...rest }>
            { children }
        </section>
    );
}) as LayoutComponent;

Layout.Header = Header;
Layout.Content = Content;
Layout.Aside = Aside;
Layout.Footer = Footer;

export default Layout;
