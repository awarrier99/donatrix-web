import React, { Component } from 'react';
import {
  Input, Dropdown, Menu, Icon, Tag
} from 'antd';
import styles from './AutoComplete.css';

const { CheckableTag } = Tag;

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      matchingData: [],
      matchingItems: [],
      categories: []
    };

    this.input = React.createRef();
    this.search = this.search.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onSearch, location } = this.props;
    const { matchingData, categories } = this.state;
    if (JSON.stringify(prevState.matchingData) !== JSON.stringify(matchingData)) {
      onSearch(matchingData);
    }
    if (prevProps.location !== location) {
      this.search(this.input.current.input.value, categories);
    }
  }

  search(value, categories) {
    const { data } = this.props;
    let matchingData = [];
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
    let reducedData = data.map(item => item.s_description);
    if (categories.length > 0) {
      reducedData = data.filter(item => categories.includes(item.category.toLowerCase()))
        .map(item => item.s_description);
    }
    if (reducedData.length > 0) {
      matchingData = reducedData.filter(item => item.toLowerCase().includes(value ? value.toLowerCase() : ''));
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
    }
    this.setState({ matchingData, matchingItems });
  }

  render() {
    const {
      className, unclick, onClick, data
    } = this.props;
    const {
      visible, matchingData, matchingItems, categories
    } = this.state;
    let items = matchingItems;

    const reducedData = data.map(item => item.s_description);
    if (reducedData.length > 0 && matchingItems.length === 0 && categories.length === 0 && (!this.input.current || !this.input.current.input.value)) {
      items = [];
      const createItem = i => {
        return (
          <Menu.Item key={i}>
            {reducedData[i]}
          </Menu.Item>
        );
      };
      const numOptions = reducedData.length > 5 ? 5 : reducedData.length;
      for (let i = 0; i < numOptions; i += 1) {
        items.push(createItem(i));
      }
    }
    const menu = (
      <Menu onClick={e => {
        if (e.key !== '-1') {
          const searchData = matchingData.length > 0 ? matchingData : reducedData;
          this.input.current.input.value = searchData[e.key];
          this.input.current.focus();
          this.search(searchData[e.key], categories);
        } else {
          e.domEvent.stopPropagation();
        }
      }}
      >
        {items}
        <Menu.Item key={-1}>
          Categories:&nbsp;
          <CheckableTag
            className={categories.includes('clothing') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('clothing') });
                this.search(this.input.current.value, categories.concat(('clothing')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'clothing') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'clothing'));
              }
            }}
            checked={categories.includes('clothing')}
          >
            Clothing
          </CheckableTag>
          <CheckableTag
            className={categories.includes('hat') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('hat') });
                this.search(this.input.current.value, categories.concat(('hat')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'hat') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'hat'));
              }
            }}
            checked={categories.includes('hat')}
          >
            Hat
          </CheckableTag>
          <CheckableTag
            className={categories.includes('kitchen') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('kitchen') });
                this.search(this.input.current.value, categories.concat(('kitchen')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'kitchen') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'kitchen'));
              }
            }}
            checked={categories.includes('kitchen')}
          >
            Kitchen
          </CheckableTag>
          <CheckableTag
            className={categories.includes('electronics') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('electronics') });
                this.search(this.input.current.value, categories.concat(('electronics')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'electronics') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'electronics'));
              }
            }}
            checked={categories.includes('electronics')}
          >
            Electronics
          </CheckableTag>
          <CheckableTag
            className={categories.includes('household') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('household') });
                this.search(this.input.current.value, categories.concat(('household')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'household') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'household'));
              }
            }}
            checked={categories.includes('household')}
          >
            Household
          </CheckableTag>
          <CheckableTag
            className={categories.includes('other') ? styles.tag : styles.uncheckedTag}
            onChange={checked => {
              if (checked) {
                this.setState({ categories: categories.concat('other') });
                this.search(this.input.current.value, categories.concat(('other')));
              } else {
                this.setState({ categories: categories.filter(cat => cat !== 'other') });
                this.search(this.input.current.value, categories.filter(cat => cat !== 'other'));
              }
            }}
            checked={categories.includes('other')}
          >
            Other
          </CheckableTag>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} visible={!unclick && visible}>
        <Input
          className={className}
          addonBefore={<Icon type="search" />}
          placeholder="Search items"
          onChange={e => { this.search(e.target.value, categories); this.setState({ visible: true }); }}
          onClick={e => { e.stopPropagation(); this.setState({ visible: true }); onClick(); }}
          ref={this.input}
        />
      </Dropdown>
    );
  }
}

export default AutoComplete;
