import React, { Component } from 'react';
import {
  Table,
  Card,
  Button,
  message,
  Pagination,
  Divider,
  Popconfirm,
  Input,
} from 'antd';
import styles from '../BookManage.less';

const listData = [
  {
    key: '1',
    workId: '文学',
    number: '10',
  },
  {
    key: '2',
    workId: '科技',
    number: '231',
  },
  {
    key: '3',
    workId: '励志',
    number: '20',
  },
  {
    key: '4',
    workId: '故事',
    number: '120',
  },
  {
    key: '5',
    workId: '修仙',
    number: '82',
  },
  {
    key: '6',
    workId: '传记',
    number: '310',
  },
];
export default class BookCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: listData,
    };
  }
  getRowByKey(key) {
    return this.state.data.filter(item => item.key === key)[0];
  }
  index = 0;
  cacheOriginData = {};
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submit',
          payload: values,
        });
      }
    });
  };
  toggleEditable(e, key) {
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
      }
      target.editable = !target.editable;
      this.setState({ data: [...this.state.data] });
    }
  }
  remove(key) {
    const newData = this.state.data.filter(item => item.key !== key);
    this.setState({ data: newData });
  }
  newMember = () => {
    const newData = [...this.state.data];
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };
  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key);
    }
  }
  handleFieldChange(e, fieldName, key) {
    const newData = [...this.state.data];
    const target = this.getRowByKey(key);
    if (target) {
      target[fieldName] = e.target.value;
      this.setState({ data: newData });
    }
  }
  saveRow(e, key) {
    e.persist();
    // save field when blur input
    setTimeout(() => {
      if (
        document.activeElement.tagName === 'INPUT' &&
        document.activeElement !== e.target
      ) {
        return;
      }
      if (this.clickedCancel) {
        this.clickedCancel = false;
        return;
      }
      const target = this.getRowByKey(key) || {};
      if (!target.workId) {
        message.error('请填写完整成员信息。');
        e.target.focus();
        return;
      }
      delete target.isNew;
      this.toggleEditable(e, key);
    }, 10);
  }
  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const target = this.getRowByKey(key);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      target.editable = false;
      delete this.cacheOriginData[key];
    }
    this.setState({ data: [...this.state.data] });
  }
  extraContent = () => {
    return (
      <div className={styles.extraContent}>
        <Button onClick={this.newMember} type="dashed" icon="plus">
          添加
        </Button>
      </div>
    );
  };
  render() {
    const columns = [
      {
        dataIndex: 'workId',
        key: 'workId',
        width: '23%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'workId', record.key)}
                onBlur={e => this.saveRow(e, record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="分类名称"
              />
            );
          }
          return <a href="#">{text}</a>;
        },
      },
      {
        dataIndex: 'number',
        key: 'number',
        render: (text) => {
          return (
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              共{text}本
            </div>
          );
        },
      },
      {
        key: 'action',
        width: 120,
        render: (text, record) => {
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a>保存</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="是否要删除此行？"
                    onConfirm={() => this.remove(record.key)}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="是否要删除此行？"
                onConfirm={() => this.remove(record.key)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    return (
      <Card
        title="图书分类"
        bordered
        className={styles.listCard}
        bodyStyle={{ padding: '0' }}
        extra={this.extraContent()}
      >
        <Table
          columns={columns}
          showHeader={false}
          dataSource={this.state.data}
          pagination={false}
        />
        <Pagination
          className={styles.pagination}
          defaultCurrent={1}
          total={30}
        />
      </Card>
    );
  }
}
