import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import { styles } from './ButtonBase.style';
import { Theme } from '../styles';
import Ripple from './Ripple';

export interface ButtonBaseProps {
    className?: string;
    disabled?: boolean;
    disableRipple?: boolean;
    centerRipple?: boolean;
    href?: string;
    children?: React.ReactNode,
    component?: React.ElementType;
}

type ButtonBaseClassProps = 'root' | 'disabled';

const name = 'ButtonBase';
const useStyles = createUseStyles<Theme, ButtonBaseClassProps>(styles, { name });

const ButtonBase: React.FC<ButtonBaseProps> = React.forwardRef<HTMLButtonElement, ButtonBaseProps>((props, ref) => {
    const { className, component, disabled, centerRipple, href, disableRipple, children, ...rest } = props;
    const Component = href ? 'a' : component === void 0 ? 'button' : component;
    const classes = useStyles(props);
    const classNames = classnames(
        classes.root,
        {
            [classes.disabled]: disabled
        },
        className
    );

    return (
        <Component
            className={ classNames }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { children }
            { !disableRipple ? <Ripple center={ centerRipple }/> : null }
        </Component>
    );
});

ButtonBase.displayName = name;
ButtonBase.defaultProps = {
    className: undefined,
    disabled: false,
    disableRipple: false,
    centerRipple: false,
    href: undefined,
    component: 'button'
};

ButtonBase.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    centerRipple: PropTypes.bool,
    href: PropTypes.string
};

export default ButtonBase;
