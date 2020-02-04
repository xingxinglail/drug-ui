import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Item.style';
import { createUseStyles } from '../styles';
import { MenuContext } from './Menu.context';
import { useCombinedRefs } from '@drug-ui/hooks';
import { useStyles as menuUseStyles } from './Menu';
import { useStyles as subMenuUseStyles } from './SubMenu';

export interface ItemProps extends React.HTMLAttributes<HTMLLIElement> {
    index: number | string;
    ref?: React.Ref<HTMLLIElement>;
}

type ClassProps = 'root' | 'label';

const name = 'Item';

const useStyles = createUseStyles<ClassProps>(styles, name);

const Item: React.FC<ItemProps> = React.forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
    const { className, index, children, ...rest } = props;
    const { activeSelectedIndex, handleSelectChange } = React.useContext(MenuContext);
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        { selected: activeSelectedIndex === index },
        className
    );

    const handleClick = () => {
        handleSelectChange(index);
    };

    const innerRef = React.useRef<HTMLLIElement>(null);
    const combinedRef = useCombinedRefs<HTMLLIElement>(ref, innerRef);

    const menuClasses = menuUseStyles();
    const subMenuClasses = subMenuUseStyles();
    React.useEffect(() => {
        let paddingLeft = 16;
        let parent = innerRef.current!.parentElement;
        while (parent && !parent.classList.contains(menuClasses.root)) {
            if (parent.classList.contains(subMenuClasses.root)) {
                paddingLeft += 16;
            }
            parent = parent.parentElement;
        }
       innerRef.current!.style.paddingLeft = `${paddingLeft}px`;
    }, []);

    return (
        <li
            className={ classNames }
            ref={ combinedRef }
            onClick={ handleClick }
            { ...rest }>
            { children }
        </li>
    );
});

Item.displayName = name;

export default Item;
