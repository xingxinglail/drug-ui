import * as React from 'react';
import Layout from '@drug-ui/core/Layout';
import { createUseStyles } from '@drug-ui/styles';

const useStyles = createUseStyles({
    root: {
        '&:not(:last-child)': {
            marginBottom: 22
        },
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    },
    basic: {
        color: '#fff',
        backgroundColor: '#7dbcea'
    },
    basicMain: {
        backgroundColor: '#108ee9',
        height: 120,
        lineHeight: '120px'
    },
    aside: {
        backgroundColor: '#3ba0e9',
        height: 120,
        lineHeight: '120px'
    }
}, { name: 'Layouts', index: 1 });

const { Header, Content, Aside, Footer } = Layout;

export default function Layouts () {
    const classes = useStyles();

    return (
        <div>
            <Layout className={ classes.root }>
                <Header className={ classes.basic }>Header</Header>
                <Content className={ classes.basicMain }>Content</Content>
                <Footer className={ classes.basic }>Footer</Footer>
            </Layout>
            <Layout className={ classes.root }>
                <Header className={ classes.basic }>Header</Header>
                <Layout>
                    <Aside width={ 200 } className={ classes.aside }>Aside</Aside>
                    <Content className={ classes.basicMain }>Content</Content>
                </Layout>
                <Footer className={ classes.basic }>Footer</Footer>
            </Layout>
            <Layout className={ classes.root }>
                <Header className={ classes.basic }>Header</Header>
                <Layout>
                    <Content className={ classes.basicMain }>Content</Content>
                    <Aside width={ 200 } className={ classes.aside }>Aside</Aside>
                </Layout>
                <Footer className={ classes.basic }>Footer</Footer>
            </Layout>
            <Layout className={ classes.root }>
                <Aside width={ 200 } className={ classes.aside } style={{ height: 'auto' }}>Aside</Aside>
                <Layout>
                    <Header className={ classes.basic }>Header</Header>
                    <Content className={ classes.basicMain }>Content</Content>
                    <Footer className={ classes.basic }>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
};
