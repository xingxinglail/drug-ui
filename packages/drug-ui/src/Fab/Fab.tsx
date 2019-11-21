import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PropTypes as ComponentPropTypes } from '..';
import classnames from 'classnames';
import { capitalize } from '../utils';
import { styles } from './Fab.style';
import { createUseStyles } from '../styles';
import ButtonBase, { ButtonBaseProps } from '../ButtonBase';

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonBaseProps {
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    disabled?: boolean;
    ref?: React.Ref<HTMLButtonElement>
}

type FabClassProps = 'root' | 'primary' | 'secondary' | 'colorInherit' | 'small' | 'medium' | 'disabled';

const name = 'Fab';

const useStyles = createUseStyles<FabClassProps>(styles, name);

const Fab: React.FC<FabProps> = React.forwardRef<HTMLButtonElement, FabProps>((props, ref) => {
    const { className, color = 'default', size = 'large', disabled, component, href, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        {
            [classes[color]]: color !== 'inherit' && color !== 'default',
            [classes[`size${ capitalize(size) }`]]: size !== 'large',
            [classes.colorInherit]: color === 'inherit',
            [classes.disabled]: disabled
        }
    );

    return (
        <ButtonBase
            className={ classNames }
            component={ component }
            ref={ ref }
            href={ href }
            disabled={ disabled }
            { ...rest }>
            { children }
        </ButtonBase>
    );
});

Fab.displayName = name;

Fab.defaultProps = {
    color: 'default',
    size: 'large'
};

Fab.propTypes = {
    color: PropTypes.oneOf<ComponentPropTypes.Color>(['default', 'primary', 'secondary', 'inherit']),
    size: PropTypes.oneOf<ComponentPropTypes.Size>(['small', 'medium', 'large'])
};

export default Fab;
