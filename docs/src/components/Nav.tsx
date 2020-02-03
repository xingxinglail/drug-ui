import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ScrollBar } from '@drug-ui/core';
import { createUseStyles, Theme } from '@drug-ui/core/styles';
import { Styles } from 'jss';

type ClassProps = 'nav' | 'logo' | 'menu';

const useStyles = createUseStyles<ClassProps>((theme: Theme): Styles => {
    return {
        nav: {
            width: 240,
            position: 'fixed',
            zIndex: 99999,
            top: 0,
            bottom: 0,
            backgroundColor: '#fff',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            fontSize: 14,

            '& ul': {
                paddingTop: 8,
                paddingBottom: 8
            }
        },
        logo: {
            height: 64,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        },
        menu: {
            '& a': {
                color: 'rgba(0, 0, 0, 0.87)',
                '&::before': {
                    content: '" "',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }
            },
            '& .selected a': {
                color: theme.palette.primary.main
            }
        }
    };
}, 'Nav');

const { SubMenu, Item: MenuItem } = Menu;

const Nav = () => {
    const classes = useStyles();
    const location = useLocation();
    const data = [
        {
            index: '/getting-started',
            title: '入门教程',
            children: [
                {
                    index: '/installation',
                    title: '安装'
                },
                {
                    index: '/usage',
                    title: '使用'
                }
            ]
        },
        {
            index: '/components',
            title: 'Components（组件）',
            children: [
                {
                    index: '/buttons',
                    title: 'Button（按钮）'
                },
                {
                    index: '/layouts',
                    title: 'Layout（布局）'
                },
                {
                    index: '/scroll-bars',
                    title: 'ScrollBar（滚动条）'
                },
                {
                    index: '/dialogs',
                    title: 'Dialog（对话框）'
                },
                {
                    index: '/menus',
                    title: 'Menu（导航菜单）'
                }
            ]
        },
        {
            index: '/api',
            title: 'Components API',
            children: [
                {
                    index: '/button',
                    title: 'Button'
                },
                {
                    index: '/button-base',
                    title: 'ButtonBase'
                },
                {
                    index: '/button-group',
                    title: 'ButtonGroup'
                },
                {
                    index: '/fab',
                    title: 'Fab'
                },
                {
                    index: '/icon-button',
                    title: 'IconButton'
                },
                {
                    index: '/layout',
                    title: 'Layout'
                },
                {
                    index: '/scroll-bar',
                    title: 'ScrollBar'
                },
                {
                    index: '/dialog',
                    title: 'Dialog'
                },
                {
                    index: '/menu',
                    title: 'Menu'
                },
                {
                    index: '/sub-menu',
                    title: 'Menu.SubMenu'
                },
                {
                    index: '/menu-item',
                    title: 'Menu.Item'
                }
            ]
        }
    ];

    return (
        <nav className={ classes.nav }>
            <ScrollBar style={ { height: '100%' } }>
                <div className={ classes.logo }>logo</div>
                <Menu
                    className={ classes.menu }
                    defaultOpenIndexes={ data.map(c => c.index) }
                    selectedIndex={ '/' + location.pathname.split('/')[2] }>
                    {
                        data.map(v => (
                            <SubMenu
                                key={ v.index }
                                index={ v.index }
                                title={ v.title }>
                                {
                                    v.children.map(c => (
                                        <MenuItem key={ c.index } index={ c.index }>
                                            <Link to={ `${ v.index }${ c.index }` }>{ c.title }</Link>
                                        </MenuItem>
                                    ))
                                }
                            </SubMenu>
                        ))
                    }
                </Menu>
            </ScrollBar>
        </nav>
    );
};

export default Nav;
