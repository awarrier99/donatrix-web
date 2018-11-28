import React, { Component } from 'react';
import {
  Input, Row, Col, Button, message
} from 'antd';
import styles from './Auth.css';
import logo from '../images/logo.png';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false
    };

    this.frstnameInput = React.createRef();
    this.lastnameInput = React.createRef();
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.confpassInput = React.createRef();
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    message.config({
      top: 100,
      duration: 5,
      maxCount: 1
    });
  }

  logIn() {
    const username = this.usernameInput.current.input.value;
    const password = this.passwordInput.current.input.value;
    if (username && password) {
      fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            message.success('Logged in successfully');
          } else {
            message.error(json.msg);
          }
        })
        .catch(console.error);
    }
  }

  render() {
    const { register } = this.state;
    return (
      <div className={styles.auth}>
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <Row type="flex" justify="center">
            <img alt="" src={logo} />
          </Row>
          <br />
          {register ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Input className={styles.input} ref={this.frstnameInput} placeholder="First Name" />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          {register ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Input className={styles.input} ref={this.lastnameInput} placeholder="Last Name" type="password" />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          <Row type="flex" justify="center">
            <Col span={4}>
              <Input className={styles.input} ref={this.usernameInput} placeholder="Username" />
            </Col>
          </Row>
          <br />
          <Row type="flex" justify="center">
            <Col span={4}>
              <Input className={styles.input} ref={this.passwordInput} placeholder="Password" type="password" />
            </Col>
          </Row>
          <br />
          {register ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Input className={styles.input} ref={this.confpassInput} placeholder="Confirm Password" type="password" />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          <Row type="flex" justify="center">
            <Button style={{ marginRight: 25 }} type="danger" onClick={() => this.setState({ register: false })}>
              {register ? 'Cancel' : 'Guest'}
            </Button>
            <Button type="danger" onClick={this.logIn}>
              {register ? 'Register' : 'Log In'}
            </Button>
          </Row>
          <br />
          <br />
          <br />
          {!register ? (
            <Row type="flex" justify="center">
              <span style={{ color: '#ff4d4f' }}>Don&apos;t have an account? <button className={styles.textbutton} onClick={() => this.setState({ register: true })}>Register</button></span> {/* eslint-disable-line */}
            </Row>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Auth;
