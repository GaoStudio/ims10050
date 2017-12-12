import React, { Component } from "react";
import { List, Card, Button, Pagination } from "antd";
import { connect } from "dva";
import styles from "../BookManage.less";
@connect(state => ({
  list: state.list
}))
export default class BookCategory extends Component {
  extraContent = () => {
    return (
      <div className={styles.extraContent}>
        <Button type="dashed" icon="plus">
          添加
        </Button>
      </div>
    );
  };
  CategoryContent = data => {
    return (
      <div className={styles.categoryContent}>
        <span>溫煦</span>
        <span>共0本</span>
      </div>
    );
  };
  render() {
    const { list: { list, loading } } = this.props;
    return (
      <Card
        title="图书分类"
        bordered
        className={styles.listCard}
        bodyStyle={{ padding: "0 24px 0 24px" }}
        extra={this.extraContent()}
      >
        <List
          size="large"
          rowKey="id"
          loading={loading}
          pagination={false}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a>编辑</a>, <a>刪除</a>]}>
              {this.CategoryContent(item)}
            </List.Item>
          )}
        />
        <Pagination
          className={styles.pagination}
          defaultCurrent={1}
          total={50}
        />
      </Card>
    );
  }
}
