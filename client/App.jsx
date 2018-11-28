import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Auth from './containers/Auth';
import styles from './App.css';

const {
  Content, Header, Sider
} = Layout;
const { Item } = Menu;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true
    };
  }


  render() {
    const { auth } = this.state;
    return (
      <Router>
        <Layout className={styles.full}>
          {!auth ? (
            <Sider />
          ) : ''}
          <Layout>
            {!auth ? (
              <Header>
                <Menu className={styles.menu} defaultSelectedKeys={['1']}>
                  <Item className={styles.item} key="1">
                    <Link className={styles.link} to="/">
                      Nav
                    </Link>
                  </Item>
                </Menu>
              </Header>
            ) : ''}
            <Content>
              <Switch>
                <Route exact path="/" component={Auth} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
