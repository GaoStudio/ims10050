import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Input,
  Form,
  Select,
  Icon,
  Modal,
  Dropdown,
  Menu,
} from 'antd';


import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BookManage.less';
import BookCategory from './components/BookCategory';

const { Option } = Select;
const { Search } = Input;

@connect(state => ({
  list: state.list,
}))
@Form.create()
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
    const { getFieldDecorator } = this.props.form;
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
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
          title="Basic Modal"
          wrapClassName={styles.verticalModal}
          visible={this.state.visible}
          onOk={this.handleOk}
          style={{ top: 0 }}
          onCancel={this.handleCancel}
        >
          <Form hideRequiredMark>
            <Form.Item {...formItemLayout} label="书名">
              {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="作者">
              {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="分类">
              {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
            </Form.Item>
            <Form.Item  {...formItemLayout} label="分类">
              {getFieldDecorator('owner2', {
                rules: [{ required: true, message: '请选择管理员' }],
              })(
                <Select placeholder="请选择管理员">
                  <Option value="xiao">付晓晓</Option>
                  <Option value="mao">周毛毛</Option>
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
