import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@drug-ui/core/Button';
// @ts-ignore
import logo from '../../static/logo.png';
import { createUseStyles, Theme } from '@drug-ui/core/styles';
import { Styles } from 'jss';

type ClassProps = 'root' | 'logo' | 'title' | 'desc';

const useStyles = createUseStyles<ClassProps>((theme: Theme): Styles => {
    return {
        root: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            display: 'flex',
            padding: [228, 0],
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.primary.main
        },
        logo: {
            width: 300,
            marginRight: 70
        },
        title: {
            fontWeight: 300,
            fontSize: 48,
            letterSpacing: 10,
            whiteSpace: 'nowrap',
            marginBottom: 14
        },
        desc: {
            fontWeight: 400,
            fontSize: 24,
            marginBottom: 24
        }
    };
}, 'Nav');

const Index = () => {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = () => {
        history.push('/getting-started/installation');
    };

    return (
        <div className={ classes.root }>
            <img className={ classes.logo } src={ logo } />
            <div>
                <h1 className={ classes.title }>DRUG-UI</h1>
                <h2 className={ classes.desc }>一个基于 React 的 web 组件库</h2>
                <Button variant="outlined" color="primary" onClick={ handleClick }>Get Started</Button>
            </div>
        </div>
    )
};

export default Index;
