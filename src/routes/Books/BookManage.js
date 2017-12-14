import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Input,
  Icon,
  Modal,
  Dropdown,
  Menu,
} from 'antd';


import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BookManage.less';
import BookCategory from './components/BookCategory';
import BookEditor from './components/BookEditor';

const { Search } = Input;

@connect(state => ({
  list: state.list,
}))
export default class BookManage extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk =() => {
    this.setState({ visible: false });
  }
  handleCancel=() => {
    this.setState({ visible: false });
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
      total: 50,
    };

    const ListContent = ({ data }) => (
      <div className={styles.listContent}>
        <div style={{ marginLeft: 0 }}>
          <img src="https://img3.doubanio.com//spic//s1001902.jpg" />
        </div>
        <div>
          <span>小王子</span>
          <span>郑渊洁</span>
          <span>人民日报出版社</span>
        </div>
        <div>
          <span>1号柜三层23</span>
        </div>
        <div>库存2</div>
        <div>现存1</div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>记录</a>
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
              title="全部图书"
              bodyStyle={{ padding: '0 32px 40px 32px' }}
              extra={extraContent}
            >
              <List
                size="large"
                rowKey="id"
                loading={loading}
                pagination={paginationProps}
                dataSource={list}
                renderItem={item => (
                  <List.Item actions={[<div onClick={this.showModal}><a>编辑</a></div>, <MoreBtn />]}>
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Modal
          title="编辑"
          wrapClassName={styles.verticalModal}
          visible={this.state.visible}
          onOk={this.handleOk}
          width='40%'
          style={{ top: 0 }}
          onCancel={this.handleCancel}
        >
          <BookEditor />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
