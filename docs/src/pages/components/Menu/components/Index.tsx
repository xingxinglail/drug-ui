import * as React from 'react';
import Menu from '@drug-ui/core/Menu';
import { createUseStyles } from '@drug-ui/styles';

const { SubMenu, Item: MenuItem } = Menu;

const useStyles = createUseStyles({
    menu: {
        '& .selected': {
            color: '#1976d2'
        }
    }
}, { name: 'Menu' });

export default function ScrollBarDemo () {
    const classes = useStyles();

    return (
        <div className={ classes.menu }>
            <Menu defaultOpenIndexes={ ['1', '2'] } defaultSelectedIndex="1-3">
                <SubMenu index="1" title="导航一">
                    <MenuItem index="1-1">选项1</MenuItem>
                    <MenuItem index="1-2">选项2</MenuItem>
                    <MenuItem index="1-3">选项3</MenuItem>
                    <SubMenu index="1-4" title="选项4">
                        <MenuItem index="1-4-1">选项1</MenuItem>
                        <MenuItem index="1-4-2">选项2</MenuItem>
                    </SubMenu>
                </SubMenu>
                <SubMenu index="2" title="导航二">
                    <MenuItem index="2-1">选项1</MenuItem>
                    <MenuItem index="2-2">选项2</MenuItem>
                    <MenuItem index="2-3">选项3</MenuItem>
                    <MenuItem index="2-4">选项4</MenuItem>
                </SubMenu>
            </Menu>
        </div>
    );
};
