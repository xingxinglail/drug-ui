import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from './Aside.style';
import { createUseStyles } from '../styles';
import { LayoutProps } from './Layout';
import { isNumeric } from '../utils';

export interface AsideProps extends LayoutProps {
    width?: number | string;
}

type LayoutClassProps = 'root';

const name = 'LayoutAside';

const useStyles = createUseStyles<LayoutClassProps>(styles, name);

const Aside: React.FC<AsideProps> = React.forwardRef<HTMLDivElement, AsideProps>((props, ref) => {
    const { className, width, children, ...rest } = props;
    const value = isNumeric(width) ? `${ width }px` : width;
    const widthStyle = {
        width: value,
        flex: `0 0 ${ value }`
    };

    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );

    return (
        <aside
            className={ classNames }
            style={ widthStyle }
            ref={ ref }
            { ...rest }>
            { children }
        </aside>
    );
});

Aside.displayName = name;

Aside.defaultProps = {
    className: undefined,
    width: 200
};

Aside.propTypes = {
    className: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Aside;
