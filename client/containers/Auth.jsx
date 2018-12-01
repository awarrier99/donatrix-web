import React, { Component } from 'react';
import {
  Input, Row, Col, Button, message, Select, Icon, Tooltip
} from 'antd';
import styles from './Auth.css';
import logo from '../images/logo.png';

const { Option } = Select;

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register: false,
      locations: [],
      showLocations: false,
      type: 'USER',
      locId: 0,
      showPass: false
    };

    this.frstnameInput = React.createRef();
    this.lastnameInput = React.createRef();
    this.usernameInput = React.createRef();
    this.passwordInput = React.createRef();
    this.confpassInput = React.createRef();
    this.logIn = this.logIn.bind(this);
    this.register = this.register.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/locations', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ locations: json.locations });
        }
      })
      .catch(console.error);
    message.config({
      top: 100,
      duration: 5,
      maxCount: 1
    });
  }

  logIn() {
    const { register } = this.state;
    const username = this.usernameInput.current.input.value;
    const password = this.passwordInput.current.input.value;
    if (username && password) {
      fetch('/api/login', {
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
            if (!register) message.success('Logged in successfully');
            const date = new Date((new Date()).getTime() + (60 * 60 * 1000));
            document.cookie = `session=user:${JSON.stringify(json.user)};expires=${date.toUTCString()};path=/`;
            const { onLogin } = this.props;
            onLogin();
          } else {
            message.error(json.msg);
          }
        })
        .catch(console.error);
    }
  }

  register() {
    const frstname = this.frstnameInput.current.input.value;
    const lastname = this.lastnameInput.current.input.value;
    const name = `${frstname} ${lastname}`;
    const username = this.usernameInput.current.input.value;
    const password = this.passwordInput.current.input.value;
    const { type, locId } = this.state;
    // const confPass = this.confpassInput.current.input.value; TODO form validation
    if (frstname && lastname && username && password) {
      const body = {
        email: username,
        password,
        name,
        type,
        locked: 0
      };
      if (type === 'LOCATION_EMPLOYEE') body.loc_id = locId;
      console.log(body);
      fetch('/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            message.success('Registered successfully');
            this.logIn();
          } else {
            message.error(json.msg);
          }
        })
        .catch(console.error);
    }
  }

  handleUserTypeChange(value) {
    const showLocations = value.includes('LOC');
    this.setState({ showLocations, type: value });
  }

  handleLocationChange(value) {
    this.setState({ locId: value });
  }

  render() {
    const {
      register, locations, showLocations, showPass
    } = this.state;
    const locationOptions = [];
    const createOptions = i => {
      const loc = locations[i];
      return <Option value={loc.idLocation} key={i}>{loc.Name}</Option>;
    };
    for (let i = 0; i < locations.length; i += 1) {
      locationOptions.push(createOptions(i));
    }
    const passIcon = (
      <Tooltip title={showPass ? 'Hide' : 'Show'}>
        <Icon style={{ cursor: 'pointer' }} type={showPass ? 'unlock' : 'lock'} onClick={() => this.setState({ showPass: !showPass })} />
      </Tooltip>
    );
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
                <Input className={styles.input} addonBefore={<Icon type="profile" />} ref={this.frstnameInput} placeholder="First Name" />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          {register ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Input className={styles.input} addonBefore={<Icon type="profile" />} ref={this.lastnameInput} placeholder="Last Name" />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          <Row type="flex" justify="center">
            <Col span={4}>
              <Input className={styles.input} addonBefore={<Icon type="user" />} ref={this.usernameInput} placeholder="Username" />
            </Col>
          </Row>
          <br />
          <Row type="flex" justify="center">
            <Col span={4}>
              <Input
                className={styles.input}
                addonBefore={passIcon}
                ref={this.passwordInput}
                placeholder="Password"
                type={showPass ? 'text' : 'password'}
                onKeyPress={e => {
                  if (e.key === 'Enter') this.logIn();
                }}
              />
            </Col>
          </Row>
          <br />
          {register ? (
            <Row type="flex" justify="center">
              <Col span={4}>
                <Input
                  className={styles.input}
                  addonBefore={passIcon}
                  ref={this.confpassInput}
                  placeholder="Confirm Password"
                  type={showPass ? 'text' : 'password'}
                />
              </Col>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          {register ? (
            <Row type="flex" justify="center">
              <Select className={styles.select} defaultValue="USER" onChange={this.handleUserTypeChange}>
                <Option value="USER">User</Option>
                <Option value="LOCATION_EMPLOYEE">Location Employee</Option>
                <Option value="MANAGER">Manager</Option>
                <Option value="ADMIN">Admin</Option>
              </Select>
            </Row>
          ) : null}
          {register ? (
            <br />
          ) : null}
          {showLocations ? (
            <Row type="flex" justify="center">
              <Select className={styles.select} defaultValue={locations[0].Name} onChange={this.handleLocationChange}>
                {locationOptions}
              </Select>
            </Row>
          ) : null}
          {showLocations ? (
            <br />
          ) : null}
          <Row type="flex" justify="center">
            <Button style={{ marginRight: 25 }} type="danger" onClick={() => this.setState({ register: false, showLocations: false })}>
              {register ? 'Cancel' : 'Guest'}
            </Button>
            <Button type="danger" onClick={register ? this.register : this.logIn}>
              {register ? 'Register' : 'Log In'}
            </Button>
          </Row>
          <br />
          {!register ? (
            <div>
              <Row type="flex" justify="center">
                <span><button className={styles.textbutton}>Forgot password?</button></span> {/* eslint-disable-line */}
              </Row>
              <br />
              <br />
              <Row type="flex" justify="center">
                <span style={{ color: '#ff4d4f' }}>Don&apos;t have an account? <button className={styles.textbutton} onClick={() => this.setState({ register: true })}>Register</button></span> {/* eslint-disable-line */}
              </Row>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Auth;
