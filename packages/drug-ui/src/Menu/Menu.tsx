import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Menu.style';
import { createUseStyles } from '../styles';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { ItemProps } from './Item';
import { MenuContext } from './Menu.context';

export type Index = number | string;

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
    defaultOpenIndexes?: any[];
    openIndexes?: any[];
    defaultSelectedIndex?: Index;
    selectedIndex?: Index;
    onOpenChange?: (indexes: any[]) => void;
    onSelectChange?: (index: Index) => void;
    ref?: React.Ref<HTMLUListElement>;
}

type ClassProps = 'root';

const name = 'Menu';

const useStyles = createUseStyles<ClassProps>(styles, name);

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757
export interface MenuComponent extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLUListElement>> {
    SubMenu: React.FC<SubMenuProps>;
    Item: React.FC<ItemProps>;
}

const Menu = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
    const {
        className,
        defaultOpenIndexes = [],
        openIndexes: openIndexesProp,
        defaultSelectedIndex,
        selectedIndex: selectedIndexProp,
        onOpenChange,
        onSelectChange,
        children,
        ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );
    // 是否是受控组件
    const { current: isControlled } = React.useRef(Array.isArray(openIndexesProp));
    const [openIndexesState, setOpenIndexesState] = React.useState(defaultOpenIndexes);
    const openIndexes = isControlled ? openIndexesProp : openIndexesState;

    const { current: isSelectedControlled } = React.useRef(selectedIndexProp !== undefined);
    const [selectedIndexState, setSelectedIndexState] = React.useState(defaultSelectedIndex);
    const selectedIndex = isSelectedControlled ? selectedIndexProp : selectedIndexState;

    const contextValue = React.useMemo(() => {
        return {
            activeSelectedIndex: selectedIndex,
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
            },
            handleSelectChange (index: Index) {
                if (!isSelectedControlled) {
                    setSelectedIndexState(index);
                }
                if (onSelectChange) {
                    onSelectChange(index);
                }
            }
        };
    }, [isControlled, openIndexes,onOpenChange, isSelectedControlled, selectedIndex, onSelectChange]);

    const isReactElement = (data: any): data is React.ReactElement<{ index: Index, children: React.ReactNode, visible?: boolean }> => {
        return typeof data === 'object' && typeof data.type === 'object';
    };

    let level = 1;
    const formatChildren = React.useCallback((children: React.ReactNode, isTop = false) => {
        if (!isTop) level++;
        const cloneChild: React.ReactElement[] = [];
        React.Children.forEach(children, child => {
            if (isReactElement(child)) {
                const cloneProps = {
                    ...child.props,
                    key: child.props.index,
                    level
                };
                // @ts-ignore
                if (child.type.displayName === name || child.type.displayName === SubMenu.displayName) {
                    cloneProps.children = typeof child.props.children === 'object' ? formatChildren(child.props.children) : child.props.children;
                }
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
            <ul
                className={ classNames }
                ref={ ref }
                { ...rest }>
                { formatChildren(children, true) }
            </ul>
        </MenuContext.Provider>
    );
}) as MenuComponent;

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
