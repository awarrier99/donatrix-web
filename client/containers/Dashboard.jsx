import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row } from 'antd';
import { getUser } from '../util';
import styles from './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0
    };
    this.userType = getUser().type;
  }

  componentDidMount() {
    this.setState({ height: document.getElementsByClassName('ant-layout-content')[0].clientHeight });
  }

  render() {
    const { height } = this.state;
    return (
      <div className={styles.dashboard} style={{ height }}>
        <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
          <Row type="flex" justify="center">
            <Card className={styles.card} title="Items">
              <Link to="/items">{this.userType === 'LOCATION_EMPLOYEE' ? 'Add, edit, and view items' : 'View items'}</Link>
            </Card>
            <Card className={styles.card} title="Items">
              <p>Add, edit, and view items</p>
            </Card>
          </Row>
          <Row type="flex" justify="center">
            <Card className={styles.card} title="Items">
              <p>Add, edit, and view items</p>
            </Card>
            <Card className={styles.card} title="Items">
              <p>Add, edit, and view items</p>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;
