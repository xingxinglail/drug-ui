import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
// import './style/index.scss';
import jss from 'jss';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import expand from 'jss-plugin-expand';
import defaultUnit from 'jss-plugin-default-unit';
import { capitalize } from '../utils';
import Ripple from './Ripple';
import Icons from '../Icon';
import { styles } from './Button.style';

jss.use(nested());
jss.use(camelCase());
jss.use(expand());
jss.use(defaultUnit());

console.log(styles());
export type Variant = 'text' | 'outlined' | 'contained' | 'fab';
export type Color = 'default' | 'primary' | 'secondary' | 'inherit';
export type Size = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    color?: Color;
    size?: Size;
    disabled?: boolean;
    disableRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    round?: boolean;
    fab?: boolean;
    icon?: boolean;
    loading?: boolean;
    children?: React.ReactNode,
    component?: React.ElementType;
    ref?: React.Ref<HTMLButtonElement>
}

const name = 'Button';
type ButtonClassProps =
    'root'
    | 'contained'
    | 'containedPrimary'
    | 'containedSecondary'
    | 'text'
    | 'textPrimary'
    | 'textSecondary' | 'outlined' | 'outlinedPrimary' | 'outlinedSecondary' | 'colorInherit' | 'fullWidth' | 'disabled';
const sheet = jss.createStyleSheet<ButtonClassProps>(
    styles(),
    {
        meta: `Dui${ name }`,
        classNamePrefix: name,
        generateId (rule, sheet) {
            return `Dui${ sheet!.options.classNamePrefix }-${ rule.key }`;
        }
    }
).attach();

const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, variant = 'text', color = 'default', size, disabled, disableRipple, component, fullWidth: defaultFullWidth, href, round, fab, icon, loading, children, ...rest } = props;
    const Component = href ? 'a' : component === void 0 ? 'button' : component;

    const { classes } = sheet;
    console.log(classes);
    const classNames = classnames(
        classes.root,
        [classes[variant]],
        {
            [classes[`${ variant }${ capitalize(color) }`]]: color !== 'inherit' && color !== 'default',
            [classes.colorInherit]: color === 'inherit',
            [classes.fullWidth]: defaultFullWidth,
            [classes.disabled]: disabled
        }
    );
    // const classNames = classes(
    //     root,
    //     scopedClass(variant),
    //     colorClassName,
    //     round ? scopedClass('round') : '',
    //     size !== 'medium' ? scopedClass(`${ variant }-${ size }`) : '',
    //     fullWidth ? scopedClass('full-width') : '',
    //     fab ? scopedClass('fab') : '',
    //     icon ? scopedClass('icon') : '',
    //     loading ? scopedClass('loading') : '',
    //     disabled ? scopedClass(`${ variant }-disabled`) : '',
    //     disabled ? scopedClass('disabled') : '',
    //     className);

    const newChildren = React.Children.map(children, child => {
        const type = typeof child;
        if (type === 'string' || type === 'number') {
            return <span className='label'>{ child }</span>;
        }
        return child;
    });

    return (
        <Component
            className={ classNames }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { newChildren }
            { loading ? <Icons className="icon-spin" name="loading"/> : null }
            { !disableRipple ? <Ripple center={ icon }/> : null }
        </Component>
    );
});

Button.displayName = name;
Button.defaultProps = {
    variant: 'text',
    color: 'default',
    size: 'medium',
    disabled: false,
    disableRipple: false,
    fullWidth: false,
    href: undefined,
    round: false,
    icon: false,
    loading: false,
    component: 'button'
};

Button.propTypes = {
    variant: PropTypes.oneOf<Variant>(['text', 'outlined', 'contained', 'fab']),
    color: PropTypes.oneOf<Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<Size>(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    disableRipple: PropTypes.bool,
    fullWidth: PropTypes.bool,
    href: PropTypes.string,
    round: PropTypes.bool,
    icon: PropTypes.bool,
    loading: PropTypes.bool
    // component: PropTypes.elementType
};

export default Button;
