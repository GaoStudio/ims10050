import React, { PureComponent } from 'react';
import { Card, Modal, Button, Icon, List } from 'antd';
import styles from '../BookStore.less';
import BookCaseAdd from './BookCaseAdd';

export default class BookCase extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      caselists: [{
        id: 1,
        avatar: 'hah',
        title: 'fdsf',
        description: 'fds',
        layers: [
          {
            layer: 1,
            number: 22,
          },
          {
            layer: 2,
            number: 25,
          },
          {
            layer: 3,
            number: 25,
          },
          {
            layer: 4,
            number: 25,
          },
          {
            layer: 5,
            number: 25,
          },
        ],
      }],
    };
  }
  componentDidMount() {
  }
  handleAddCase=() => {
    this.setState({ visible: true });
  }
  handleCancel=() => {
    this.setState({ visible: false });
  }
  layerItem=(item) => {
    return (
      <List.Item key={item.layer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, marginBottom: 10, flex: 1 }}>
          <span>{item.layer}</span>
          <span>{item.number}</span>
        </div>
      </List.Item>
    );
  }
  layerList=(data) => {
    return (
      <List
        rowKey="id"
        dataSource={data}
        renderItem={item => this.layerItem(item)}
      />
    );
  }
  caseItem=(item) => {
    return (
      <List.Item key={item.id}>
        <Card title="书柜" hoverable className={styles.card} actions={[<a>编辑</a>, <a>删除</a>]} >
          {this.layerList(item.layers)}
        </Card>
      </List.Item>
    );
  }
  caseAdd=() => {
    return (
      <List.Item >
        <Button onClick={this.handleAddCase} type="dashed" className={styles.newButton}>
          <Icon type="plus" /> 新增书柜
        </Button>
      </List.Item>
    );
  }
  render() {
    return (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          grid={{ gutter: 24, lg: 4, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...this.state.caselists]}
          renderItem={item => (item ? this.caseItem(item) : this.caseAdd())}
        />
        <Modal
          title="添加书柜"
          wrapClassName={styles.verticalModal}
          visible={this.state.visible}
          onOk={this.handleOk}
          width="30%"
          style={{ top: 0 }}
          onCancel={this.handleCancel}
        >
          <BookCaseAdd />
        </Modal>
      </div>
    );
  }
}
