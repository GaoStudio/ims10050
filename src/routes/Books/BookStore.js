import React, { Component } from 'react';
import { Tabs } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import BookCase from './components/BookCase';

export default class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'store',
    };
  }
  handleTabChange = (key) => {
    this.setState({
      currentPage: key,
    });
  }
  currenPageF=() => {
    let page = null;
    switch (this.state.currentPage) {
      case 'store':
        page = <BookCase />;
        break;
      case 'single':
        break;
      case 'series':
        break;
      default:
        break;
    }
    return page;
  }
  render() {
    const tabList = [
      {
        key: 'store',
        tab: '书柜设置',
        default: true,
      },
      {
        key: 'single',
        tab: '单本录入',
      },
      {
        key: 'series',
        tab: '连续录入',
      },
    ];
    return (
      <PageHeaderLayout
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        {this.currenPageF()}
      </PageHeaderLayout>
    );
  }
}
