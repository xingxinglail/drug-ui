import * as React from 'react';
import classnames from 'classnames';
import { styles } from './SubMenu.style';
import { createUseStyles } from '../styles';
import { SimpleSpread } from '..';
import ButtonBase from '../ButtonBase';

interface PropsExtra {
    title?: string | React.ReactNode;
}

export interface SubMenuProps extends SimpleSpread<React.HTMLAttributes<HTMLLIElement>, PropsExtra> {
    index: number | string;
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

    const titleClickHandle = (e: React.MouseEvent) => {
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
