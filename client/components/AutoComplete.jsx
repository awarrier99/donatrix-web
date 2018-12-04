import React, { Component } from 'react';
import {
  Input, Dropdown, Menu, Icon
} from 'antd';

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      matchingData: [],
      matchingItems: []
    };

    this.input = React.createRef();
    this.search = this.search.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onSearch } = this.props;
    const { matchingData } = this.state;
    if (prevState.matchingData.length !== matchingData.length) {
      onSearch(matchingData);
    }
  }

  search(value) {
    const { data } = this.props;
    const matchingItems = [];
    const boldFirstMatch = item => {
      if (value) {
        const pos = item.toLowerCase().indexOf(value.toLowerCase());
        const before = item.substring(0, pos);
        const match = item.substring(pos, pos + value.length);
        const after = item.substring(pos + value.length);
        return (
          <span>
            {before}
            <b>{match}</b>
            {after}
          </span>
        );
      }
      return item;
    };
    const matchingData = data.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    const boldedMatchingData = matchingData.map(boldFirstMatch);

    const createItem = i => {
      return (
        <Menu.Item key={i}>
          {boldedMatchingData[i]}
        </Menu.Item>
      );
    };
    const numOptions = boldedMatchingData.length > 5 ? 5 : boldedMatchingData.length;
    for (let i = 0; i < numOptions; i += 1) {
      matchingItems.push(createItem(i));
    }
    this.setState({ matchingData, matchingItems });
  }

  render() {
    const {
      className, unclick, onClick, data
    } = this.props;
    const { visible, matchingData, matchingItems } = this.state;
    let items = matchingItems;

    if (data.length > 0 && matchingItems.length === 0) {
      items = [];
      const createItem = i => {
        return (
          <Menu.Item key={i}>
            {data[i]}
          </Menu.Item>
        );
      };
      const numOptions = data.length > 5 ? 5 : data.length;
      for (let i = 0; i < numOptions; i += 1) {
        items.push(createItem(i));
      }
    }
    const menu = (
      <Menu onClick={e => { this.input.current.input.value = matchingData[e.key]; this.input.current.focus(); this.search(matchingData[e.key]); }}>
        {items}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} visible={!unclick && visible}>
        <Input
          className={className}
          addonBefore={<Icon type="search" />}
          placeholder="Search items"
          onChange={e => { this.search(e.target.value); this.setState({ visible: true }); }}
          onClick={e => { e.stopPropagation(); this.setState({ visible: true }); onClick(); }}
          ref={this.input}
        />
      </Dropdown>
    );
  }
}

export default AutoComplete;
