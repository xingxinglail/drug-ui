import * as React from 'react';
import classnames from 'classnames';
import { styles } from './SubMenu.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';
import { MenuContext } from './Menu.context';
import Ripple from '../ButtonBase/Ripple';
import { Index } from './Menu';

interface PropsExtra {
    title?: string | React.ReactNode;
}

export interface SubMenuProps extends SimpleSpread<React.HTMLAttributes<HTMLLIElement>, PropsExtra> {
    index: Index;
    visible?: boolean;
    level?: number;
    onTitleClick?: (data: { index: string | number, domEvent: React.MouseEvent }) => void;
    ref?: React.Ref<HTMLLIElement>;
}

type ClassProps = 'root' | 'subMenuTitle';

const name = 'SubMenu';

const useStyles = createUseStyles<ClassProps>(styles, name);

const SubMenu: React.FC<SubMenuProps> = React.forwardRef<HTMLLIElement, SubMenuProps>((props, ref) => {
    const { className, title, index, level = 1, onTitleClick: onTitleClickProp, visible, children, ...rest } = props;
    const classes = useStyles();
    const classNames = classnames(
        classes.root,
        className
    );
    const { handleOpenChange } = React.useContext(MenuContext);
    const titleClickHandle = (e: React.MouseEvent) => {
        handleOpenChange(index);
        onTitleClickProp && onTitleClickProp({ index, domEvent: e });
    };

    return (
        <li
            className={ classNames }
            ref={ ref }
            { ...rest }>
            <div
                className={ classes.subMenuTitle }
                style={ { paddingLeft: level * 16 } }
                onClick={ titleClickHandle }>
                { title }
                <Ripple />
            </div>
            <ul style={ { display: visible ? 'block' : 'none' } }>
                { children }
            </ul>
        </li>
    );
});

SubMenu.displayName = name;

SubMenu.defaultProps = {
    title: ''
};

export default SubMenu;
