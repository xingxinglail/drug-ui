import * as renderer from 'react-test-renderer';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Layout from '..';

const mount = enzyme.mount;

const { Header, Content, Aside, Footer } = Layout;

describe('<Layout />', () => {

    it('render successful', () => {
        const json = renderer.create(
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Aside>Aside</Aside>
                    <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        ).toJSON();
        expect(json).toMatchSnapshot();
    });

    it('Layout 设置 className', () => {
        const wrapper = mount(
            <Layout className="layout">layout</Layout>
        );
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('layout')).toBeTruthy();
    });

    it('Header 设置 className', () => {
        const wrapper = mount(
            <Header className="header">Header</Header>
        );
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('header')).toBeTruthy();
    });

    it('Aside 设置 className', () => {
        const wrapper = mount(
            <Aside className="aside">Aside</Aside>
        );
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('aside')).toBeTruthy();
    });

    it('Content 设置 className', () => {
        const wrapper = mount(
            <Content className="content">Content</Content>
        );
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('content')).toBeTruthy();
    });

    it('Footer 设置 className', () => {
        const wrapper = mount(
            <Footer className="footer">Footer</Footer>
        );
        const classList = wrapper.getDOMNode().classList;
        expect(classList.contains('footer')).toBeTruthy();
    });

    it('Aside 设置 width', () => {
        const wrapper = mount(
            <Aside width={ 300 }>Aside</Aside>
        );
        const dom = wrapper.getDOMNode();
        expect(getComputedStyle(dom).width).toBe('300px');
        expect(getComputedStyle(dom).flex).toBe('0 0 300px');
    });
});
