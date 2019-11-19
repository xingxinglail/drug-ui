import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from '@drug-ui/styles';
import { styles } from './ButtonBase.style';
import { Theme } from '../styles';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
    disabled?: boolean;
    disableRipple?: boolean;
    href?: string;
    component?: React.ElementType;
}

type ButtonBaseClassProps = 'root' | 'disabled';

const name = 'ButtonBase';
const useStyles = createUseStyles<Theme, ButtonBaseClassProps>(styles, { name });


const ButtonBase: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, component, disabled, href, disableRipple, children, ...rest } = props;
    const Component = href ? 'a' : component === void 0 ? 'button' : component;
    const classes = useStyles();

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
        </Component>
    );
});

ButtonBase.displayName = name;
ButtonBase.defaultProps = {
    disabled: false,
    disableRipple: false,
    href: undefined,
    component: 'button'
};

ButtonBase.propTypes = {
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    href: PropTypes.string
};

export default ButtonBase;
