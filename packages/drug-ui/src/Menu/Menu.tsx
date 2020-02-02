import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Menu.style';
import { createUseStyles } from '../styles';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { ItemProps } from './Item';
import { MenuContext } from './Menu.context';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultOpenIndexes?: any[];
    openIndexes?: any[];
    onOpenChange?: (indexes: any[]) => void;
    ref?: React.Ref<HTMLDivElement>;
}

export type Index = number | string;

type ClassProps = 'root';

const name = 'Menu';

const useStyles = createUseStyles<ClassProps>(styles, name);

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757
export interface MenuComponent extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLDivElement>> {
    SubMenu: React.FC<SubMenuProps>;
    Item: React.FC<ItemProps>;
}

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    const { className, defaultOpenIndexes = [], openIndexes: openIndexesProp, children, onOpenChange, ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );
    // 是否是受控组件
    const { current: isControlled } = React.useRef(Array.isArray(openIndexesProp));
    const [openIndexesState, setOpenIndexesState] = React.useState(defaultOpenIndexes);
    const openIndexes = isControlled ? openIndexesProp : openIndexesState;

    const contextValue = React.useMemo(() => {
        return {
            handleOpenChange (index: Index) {
                const openIndexesCopy = [...openIndexes!];
                const searchIndex = openIndexesCopy.findIndex(c => c === index);
                if (searchIndex >= 0) {
                    openIndexesCopy.splice(searchIndex, 1);
                } else {
                    openIndexesCopy.push(index);
                }
                if (!isControlled) {
                    setOpenIndexesState(openIndexesCopy);
                }
                if (onOpenChange) {
                    onOpenChange(openIndexesCopy);
                }
            }
        };
    }, [isControlled, openIndexes, onOpenChange]);

    const fn = (data: any): data is React.ReactElement<{ index: Index, children: React.ReactNode, visible?: boolean }> => {
        return typeof data === 'object' && typeof data.type === 'object';
    };

    let level = 1;
    const formatChildren = React.useCallback((children: React.ReactNode, isTop = false) => {
        if (!isTop) level++;
        const cloneChild: React.ReactElement[] = [];
        React.Children.forEach(children, child => {
            if (fn(child)) {
                const cloneProps = {
                    ...child.props,
                    key: child.props.index,
                    level,
                    children: typeof child.props.children === 'object' ? formatChildren(child.props.children) : child.props.children
                };
                // @ts-ignore
                if (child.type.displayName === SubMenu.displayName) {
                    cloneProps.visible = openIndexes?.includes(child.props.index);
                }
                // @ts-ignore
                cloneChild.push(React.cloneElement(child, cloneProps));
            }
            if (isTop) level = 1;
        });
        return cloneChild;
    }, [openIndexes]);

    return (
        <MenuContext.Provider value={ contextValue }>
            <div
                className={ classNames }
                ref={ ref }
                { ...rest }>
                { formatChildren(children, true) }
            </div>
        </MenuContext.Provider>
    );
}) as MenuComponent;

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
