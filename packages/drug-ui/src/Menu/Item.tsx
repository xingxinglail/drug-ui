import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Item.style';
import { createUseStyles } from '../styles';
import ButtonBase from '../ButtonBase';

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
    index: number | string;
    level?: number;
    component?: React.ElementType;
    ref?: React.Ref<HTMLLIElement>;
}

type ClassProps = 'root' | 'label' | 'active';

const name = 'Item';

const useStyles = createUseStyles<ClassProps>(styles, name);

const Item: React.FC<ItemProps> = React.forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
    const { className, level = 1, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        classes.active,
        className
    );

    return (
        <li
            className={ classNames }
            style={ { paddingLeft: level * 16 } }
            ref={ ref }
            { ...rest }>
            { children }
        </li>
    );
});

Item.displayName = name;

export default Item;
