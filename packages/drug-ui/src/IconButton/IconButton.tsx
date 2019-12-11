import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './IconButton.style';
import { createUseStyles } from '../styles';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    href?: string;
    disabled?: boolean;
    ref?: React.Ref<HTMLButtonElement>
}

type IconButtonPropsClassProps = 'root' | 'primary' | 'secondary' | 'colorInherit' | 'small' | 'medium' | 'disabled';

const name = 'IconButton';

const useStyles = createUseStyles<IconButtonPropsClassProps>(styles, name);
const IconButton: React.FC<IconButtonProps> = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
    const { className, color = 'default', size = 'large', disabled, component, children, ...rest } = props;
    const classes = useStyles();

    const colorClass = classes[color];
    const sizeClass = classes[`size${ capitalize(size) }`];

    const classNames = classnames(
        classes.root,
        {
            [colorClass]: colorClass && color !== 'inherit' && color !== 'default',
            [sizeClass]: sizeClass && size !== 'large',
            [classes.colorInherit]: color === 'inherit',
            [classes.disabled]: disabled
        },
        className
    );

    return (
        <ButtonBase
            className={ classNames }
            component={ component }
            ref={ ref }
            disabled={ disabled }
            { ...rest }>
            { children }
        </ButtonBase>
    );
});

IconButton.displayName = name;

IconButton.defaultProps = {
    color: 'default',
    size: 'large',
    centerRipple: true
};

IconButton.propTypes = {
    color: PropTypes.oneOf<ComponentPropTypes.Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<ComponentPropTypes.Size>(['small', 'medium', 'large']),
    href: PropTypes.string
};

export default IconButton;
