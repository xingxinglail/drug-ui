import * as React from 'react';
import classnames from 'classnames';
import { styles } from './ButtonGroup.style';
import { createUseStyles } from '../styles';
import { PropTypes as ComponentPropTypes, SimpleSpread } from '../index';
import { name as ButtonDisplayName, Variant } from '../Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    color?: ComponentPropTypes.Color;
    size?: ComponentPropTypes.Size;
    ref?: React.Ref<HTMLDivElement>
}

type ButtonGroupClassProps =
    'root'
    | 'grouped'
    | 'contained'
    | 'groupedContained'
    | 'groupedContainedPrimary'
    | 'groupedContainedSecondary'
    | 'groupedOutlined'
    | 'groupedOutlinedPrimary'
    | 'groupedOutlinedSecondary'
    | 'groupedText'
    | 'groupedTextPrimary'
    | 'groupedTextSecondary';

const name = 'ButtonGroup';

const useStyles = createUseStyles<ButtonGroupClassProps>(styles, name);

const ButtonGroup: React.FC<ButtonGroupProps> = React.forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
    const { className, variant = 'text', color = 'default', size = 'medium', children } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        {
            [classes.contained]: variant === 'contained'
        },
        className
    );

    const newChildren = React.Children.map(children, (child) => {
        if (child !== null && typeof child === 'object') {
            if (typeof (child as React.ReactElement).type === 'object' && (child as { type: { displayName: string } }).type.displayName === ButtonDisplayName) {
                return React.cloneElement(child as React.ReactElement, {
                    variant,
                    color,
                    size,
                    className: classnames(
                        classes.grouped,
                        {
                            [classes.groupedContained]: variant === 'contained',
                            [classes.groupedContainedPrimary]: variant === 'contained' && color === 'primary',
                            [classes.groupedContainedSecondary]: variant === 'contained' && color === 'secondary',
                            [classes.groupedOutlined]: variant === 'outlined',
                            [classes.groupedOutlinedPrimary]: variant === 'outlined' && color === 'primary',
                            [classes.groupedOutlinedSecondary]: variant === 'outlined' && color === 'secondary',
                            [classes.groupedText]: variant === 'text',
                            [classes.groupedTextPrimary]: variant === 'text' && color === 'primary',
                            [classes.groupedTextSecondary]: variant === 'text' && color === 'secondary'
                        },
                        'props' in child ? child.props.className : ''
                    )
                });
            } else {
                return child;
            }
        }
        return;
    });

    return (
        <div
            ref={ ref }
            className={ classNames }>
            { newChildren }
        </div>
    );
});

export default ButtonGroup;
