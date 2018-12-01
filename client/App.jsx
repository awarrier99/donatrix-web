import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link
} from 'react-router-dom';
import {
  Layout, Menu, message/* , Button */
} from 'antd';
import logo from './images/logo.png';
import Auth from './containers/Auth';
import { checkLoggedIn } from './util';
import Dashboard from './containers/Dashboard';
import ItemsDashboard from './containers/ItemsDashboard';
import styles from './App.css';

const { Content, Header } = Layout;
const { Item } = Menu;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      withOnLogin: () => null,
      defaultKey: '1'
    };

    this.router = React.createRef();
    this.menu = React.createRef();
  }

  componentDidMount() {
    message.config({
      top: 100,
      duration: 5,
      maxCount: 1
    });
    const onRedirect = () => {
      message.error('You must log in to view that page');
    };
    const onLogin = () => {
      this.setState({ auth: false });
      this.router.current.history.push('/dashboard');
    };
    checkLoggedIn(this.router, onRedirect)
      .then(user => {
        if (user) {
          this.setState({ auth: false });
          if (this.router.current.history.location.pathname === '/') {
            this.router.current.history.push('/dashboard');
            message.success(`Already logged in as ${user}`);
          }
        }
        const map = {
          '/dashboard': '1',
          '/items': '2'
        };
        const defaultKey = map[this.router.current.history.location.pathname];
        this.setState({ withOnLogin: () => <Auth onLogin={onLogin} />, defaultKey });
      })
      .catch(console.error);
  }

  render() {
    const { auth, withOnLogin, defaultKey } = this.state;
    const clearCookie = () => {
      document.cookie = 'session=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      this.setState({ auth: true });
      message.success('Logged out successfully');
    };

    return (
      <Router ref={this.router}>
        <Layout className={styles.full}>
          {!auth ? (
            <Header className={styles.header}>
              <div className={styles.logo}>
                <Link to="/dashboard" onClick={() => this.setState({ defaultKey: '1' })}><img className={styles.icon} src={logo} alt="" /></Link>
              </div>
              <Menu className={styles.menu} ref={this.menu} defaultSelectedKeys={['1']} theme="dark">
                <Item className={defaultKey === '1' ? [styles.item, styles.active] : styles.item} key="1">
                  <Link className={styles.link} to="/dashboard" onClick={() => this.setState({ defaultKey: '1' })}>
                    Home
                  </Link>
                </Item>
                <Item className={defaultKey === '2' ? [styles.item, styles.active] : styles.item} key="2">
                  <Link className={styles.link} to="/items" onClick={() => this.setState({ defaultKey: '2' })}>
                    Items
                  </Link>
                </Item>
                <Item className={[styles.item, styles.last]} key="3">
                  <Link className={styles.link} to="/" onClick={clearCookie}>
                    Logout
                  </Link>
                </Item>
              </Menu>
            </Header>
          ) : null}
          <Content>
            <Switch>
              <Route exact path="/" component={withOnLogin} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/items" component={ItemsDashboard} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;
