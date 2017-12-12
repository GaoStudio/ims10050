import React, { PureComponent } from "react";
import moment from "moment";
import { connect } from "dva";
import {
  Pagination,
  List,
  Card,
  Row,
  Col,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar
} from "antd";

import PageHeaderLayout from "../../layouts/PageHeaderLayout";

import styles from "./BookManage.less";
import BookCategory from "./components/BookCategory";

const { Search } = Input;

@connect(state => ({
  list: state.list
}))
export default class BookManage extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: "list/fetch",
      payload: {
        count: 5
      }
    });
  }

  render() {
    const { list: { list, loading } } = this.props;
    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 3,
      pageSize: 5,
      onChange: () => {},
      total: 50
    };
    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div>
          <span>开始时间</span>
          <p>{moment(createdAt).format("YYYY-MM-DD hh:mm")}</p>
        </div>
        <div>
          <Progress percent={percent} status={status} strokeWidth={6} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <Row gutter={24}>
          <Col
            xl={6}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className={styles.standardList}
          >
            <BookCategory />
          </Col>
          <Col
            xl={18}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ marginBottom: 24 }}
            className={styles.standardList}
          >
            <Card
              className={styles.listCard}
              bordered
              title="标准列表"
              bodyStyle={{ padding: "0 32px 40px 32px" }}
              extra={extraContent}
            >
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.logo} shape="square" size="large" />
                      }
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.subDescription}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
