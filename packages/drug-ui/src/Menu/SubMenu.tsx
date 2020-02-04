import * as React from 'react';
import classnames from 'classnames';
import { styles } from './SubMenu.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';
import { MenuContext } from './Menu.context';
import Ripple from '../ButtonBase/Ripple';
import { Index, useStyles as menuUseStyles } from './Menu';
import Collapse from '../Collapse';

interface PropsExtra {
    title?: string | React.ReactNode;
}

export interface SubMenuProps extends SimpleSpread<React.HTMLAttributes<HTMLLIElement>, PropsExtra> {
    index: Index;
    onTitleClick?: (data: { index: string | number, domEvent: React.MouseEvent }) => void;
    ref?: React.Ref<HTMLLIElement>;
}

type ClassProps = 'root' | 'subMenuTitle';

const name = 'SubMenu';

export const useStyles = createUseStyles<ClassProps>(styles, name);

const SubMenu: React.FC<SubMenuProps> = React.forwardRef<HTMLLIElement, SubMenuProps>((props, ref) => {
    const { className, title, index, onTitleClick: onTitleClickProp, children, ...rest } = props;
    const classes = useStyles();

    const classNames = classnames(
        classes.root,
        className
    );
    const { openIndexes, handleOpenChange } = React.useContext(MenuContext);
    const titleClickHandle = (e: React.MouseEvent) => {
        handleOpenChange(index);
        onTitleClickProp && onTitleClickProp({ index, domEvent: e });
    };

    const titleRef = React.useRef<HTMLDivElement>(null);
    const menuClasses = menuUseStyles();
    React.useEffect(() => {
        let parent = titleRef.current!.parentElement!.parentElement;
        let paddingLeft = 16;
        while (parent && !parent.classList.contains(menuClasses.root)) {
            if (parent.classList.contains(classes.root)) {
                paddingLeft += 16;
            }
            parent = parent.parentElement;
        }
        titleRef.current!.style.paddingLeft = `${ paddingLeft }px`;
    }, []);

    return (
        <li
            className={ classNames }
            ref={ ref }
            { ...rest }>
            <div
                className={ classes.subMenuTitle }
                ref={ titleRef }
                onClick={ titleClickHandle }>
                { title }
                <Ripple />
            </div>
            <Collapse in={ openIndexes.includes(index) }>
                <ul>
                    { children }
                </ul>
            </Collapse>
        </li>
    );
});

SubMenu.displayName = name;

SubMenu.defaultProps = {
    title: ''
};

export default SubMenu;
