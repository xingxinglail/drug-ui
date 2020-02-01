import * as React from 'react';
import classnames from 'classnames';
import { styles } from './Menu.style';
import { createUseStyles } from '../styles';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { ItemProps } from './Item';

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultOpenIndexes?: any[];
    openIndexes?: any[];
    onOpenChange?: (indexes: any[]) => void;
    ref?: React.Ref<HTMLDivElement>;
}

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

    // todo 改为 useContext API

    let level = 1;
    const formatChildren = (children: React.ReactNode, isTop = false) => {
        if (!isTop) level++;
        const cloneChild: React.ReactElement[] = [];
        React.Children.forEach(children, child => {
            if (isTop) level = 1;
            // @ts-ignore
            if (typeof child === 'object' && typeof child.type === 'object' && (child.type.displayName === SubMenu.displayName || child.type.displayName === Item.displayName)) {
                const cloneProps = {
                    // @ts-ignore
                    ...child.props,
                    // @ts-ignore
                    key: child.props.index,
                    level,
                    // @ts-ignore
                    children: typeof child.props.children === 'object' ? formatChildren(child.props.children) : child.props.children
                };
                // @ts-ignore
                if (child.type.displayName === SubMenu.displayName) {
                    // @ts-ignore
                    cloneProps.visible = openIndexes.includes(child.props.index);
                    cloneProps.onTitleClick = (data: { index: string | number, domEvent: React.MouseEvent }) => {
                        const openIndexesCopy = [...openIndexes!];
                        const searchIndex = openIndexesCopy.findIndex(c => c === data.index);
                        if (searchIndex >= 0) {
                            openIndexesCopy.splice(searchIndex, 1);
                        } else {
                            openIndexesCopy.push(data.index);
                        }
                        if (!isControlled) {
                            setOpenIndexesState(openIndexesCopy);
                        }
                        if (onOpenChange) {
                            onOpenChange(openIndexesCopy);
                        }
                        // @ts-ignore
                        child.props.onTitleClick && child.props.onTitleClick(data);
                    };
                }
                // @ts-ignore
                cloneChild.push(React.cloneElement(child, cloneProps));
            }
        });
        return cloneChild;
    };

    return (
        <div
            className={ classNames }
            ref={ ref }
            { ...rest }>
            { formatChildren(children, true) }
        </div>
    );
}) as MenuComponent;

Menu.SubMenu = SubMenu;
Menu.Item = Item;

export default Menu;
