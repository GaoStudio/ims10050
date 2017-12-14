import React, { Component } from 'react';
import {
  Input,
  Form,
  Cascader,
  InputNumber,
  Row,
  Col,
  Select,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
@Form.create()
export default class BookCaseAdd extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
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
    function onChange(value) {
      console.log(value);
    }
    return (
      <div>
        <Form hideRequiredMark>
          <Form.Item {...formItemLayout} label="名称">
            {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入书名' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="层数">
            <Row gutter={2}>
              <Col span={12}>
                {getFieldDecorator('stock', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                    )}
              </Col>
              <Col span={12}>
                {getFieldDecorator('stock', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <div>
                        <span className="ant-form-item-label">每层最多：</span>
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                      </div>

                    )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('goal', {
              rules: [{
                required: true, message: '请输入目标描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="可以写一些位置描述" rows={4} />
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
