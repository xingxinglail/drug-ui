import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Item.style';
import { createUseStyles } from '../styles';
import { MenuContext } from './Menu.context';

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
    const { className, level = 1, index, children, ...rest } = props;
    const { activeSelectedIndex, handleSelectChange } = React.useContext(MenuContext);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        { [classes.active]: activeSelectedIndex === index },
        className
    );

    const handleClick = () => {
        handleSelectChange(index);
    };

    return (
        <li
            className={ classNames }
            style={ { paddingLeft: level * 16 } }
            ref={ ref }
            onClick={ handleClick }
            { ...rest }>
            { children }
        </li>
    );
});

Item.displayName = name;

export default Item;
