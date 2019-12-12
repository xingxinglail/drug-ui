import * as React from 'react';
import { Styles } from 'jss';
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

interface IProps {
    children: (classes: Styles) => React.ReactElement;
}

const Classes = ({ children }: IProps) => {
    const classes: Styles = useStyles();
    return children(classes);
};

class Basic extends React.Component<LayoutProps, any> {

    static displayName = name;

    static Header: any;

    static Footer: any;

    static Content: any;

    static Aside: any;

    render () {
        const { className, children, ...rest } = this.props;
        let hasAside = false;
        if (children !== undefined && children !== null) {
            let _children: React.ReactElement[] = [];
            Array.isArray(children) ? _children = (children as React.ReactElement[]) : _children.push(children as React.ReactElement);
            hasAside = (_children as React.ReactElement[]).some(node => {
                return node.type === Aside;
            });
        }

        return (
            <Classes>
                { (classes: Styles) => (
                    <section
                        className={ classnames(classes.root, { [classes.hasAside]: hasAside }, className) }
                        { ...rest }>
                        { children }
                    </section>
                ) }
            </Classes>
        );
    }
}

const Layout: React.ComponentClass<LayoutProps> & {
    Header: React.FC<LayoutProps>;
    Content: React.FC<LayoutProps>;
    Aside: React.FC<AsideProps>;
    Footer: React.FC<LayoutProps>;
} = Basic;

Layout.Header = Header;
Layout.Content = Content;
Layout.Aside = Aside;
Layout.Footer = Footer;

export default Layout;
