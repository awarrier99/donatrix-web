import React, { Component } from 'react';
import {
  List, Skeleton, Button, AutoComplete, Input, Modal, Tag, Row, Card
} from 'antd';
import styles from './ItemsDashboard.css';

const { Item } = List;
const { Meta } = Item;
const { Search } = Input;

class ItemsDashboard extends Component {
  static showDetails(item) {
    fetch('/api/location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loc_id: item.location
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          const content = (
            <div>
              <Row className={styles.row} type="flex" align="middle" justify="space-between">
                <Tag color="#ff4d4f">Full Description</Tag>
                {item.l_description}
              </Row>
              <Row className={styles.row} type="flex" align="middle" justify="space-between">
                <Tag color="#ff4d4f">Location</Tag>
                {json.location.Name}
              </Row>
              <Row className={styles.row} type="flex" align="middle" justify="space-between">
                <Tag color="#ff4d4f">Value</Tag>
                {`$${Number(item.Value).toFixed(2)}`}
              </Row>
              <Row className={styles.row} type="flex" align="middle" justify="space-between">
                <Tag color="#ff4d4f">Category</Tag>
                <Tag>{item.category}</Tag>
              </Row>
            </div>
          );
          const modal = Modal.info({
            maskClosable: true,
            title: item.s_description,
            content,
            onCancel: () => modal.destroy
          });
        }
      })
      .catch(console.error);
  }

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      initLoading: true,
      data: {}
    };
  }

  componentDidMount() {
    this.setState({ height: document.getElementsByClassName('ant-layout-content')[0].clientHeight });
    fetch('/api/items', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ data: json.items });
        }
        this.setState({ initLoading: false });
      })
      .catch(console.error);
  }

  render() {
    const { height, initLoading, data } = this.state;
    return (
      <div className={styles.itemsdash} style={{ height }}>
        <Card className={styles.card} title={<span style={{ color: '#ff4d4f' }}>Items</span>}>
          <AutoComplete className={styles.search}>
            <Input className={styles.search} />
          </AutoComplete>
          <Input className={styles.search} />

          <List
            className={styles.list}
            bordered
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <Item actions={[<Button>Edit</Button>, <Button onClick={() => ItemsDashboard.showDetails(item)}>Details</Button>]}>
                <Skeleton avatar title={false} loading={initLoading} active>
                  <Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<span className={styles.item}>{item.s_description}</span>}
                    description={<span className={styles.description}>{item.l_description}</span>}
                  />
                </Skeleton>
              </Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

export default ItemsDashboard;
