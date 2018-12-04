import React, { Component } from 'react';
import {
  Input, Dropdown, Menu, Icon
} from 'antd';

class AutoComplete extends Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      visible: false
    };

    this.input = React.createRef();
  }

  render() {
    const { data, className, unclick, onClick } = this.props;
    const { search, visible } = this.state;
    const matchingItems = [];
    const boldFirstMatch = item => {
      if (search) {
        const pos = item.toLowerCase().indexOf(search.toLowerCase());
        const before = item.substring(0, pos);
        const match = item.substring(pos, pos + search.length);
        const after = item.substring(pos + search.length);
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
    const matchingData = data.filter(item => item.toLowerCase().includes(search.toLowerCase()));
    const boldedMatchingData = matchingData.map(boldFirstMatch);

    const createItem = i => {
      return (
        <Menu.Item key={i}>
          {boldedMatchingData[i]}
        </Menu.Item>
      );
    };
    for (let i = 0; i < boldedMatchingData.length; i += 1) {
      matchingItems.push(createItem(i));
    }
    const menu = (
      <Menu onClick={e => { this.input.current.input.value = matchingData[e.key]; this.input.current.focus(); }}>
        {matchingItems}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} visible={!unclick && visible}>
        <Input
          id="autocomplete-input"
          className={className}
          addonBefore={<Icon type="search" />}
          placeholder="Search items"
          onChange={e => this.setState({ search: e.target.value, visible: true })}
          onClick={e => { e.stopPropagation(); this.setState({ visible: true }); onClick(); }}
          ref={this.input}
        />
      </Dropdown>
    );
  }
}

export default AutoComplete;
