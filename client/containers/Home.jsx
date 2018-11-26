import React, { Component } from 'react';
import { Button } from 'antd';

class Home extends Component { // eslint-disable-line
  constructor(props) { // eslint-disable-line
    super(props);
  }

  render() {
    return (
      <div>
        <h1>
          Donatrix
        </h1>
        <Button type="primary" onClick={() => alert('Login')}>
          Login
        </Button>
      </div>
    );
  }
}

export default Home;
