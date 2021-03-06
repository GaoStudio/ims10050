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
export default class BookEditor extends Component {
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
          <Form.Item {...formItemLayout} label="书名">
            {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入书名' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="作者">
            {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请输入作者' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="出版者">
            {getFieldDecorator('url2', {
              rules: [{ required: true, message: '请输入出版社' }],
            })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="库存">
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
                        <span className="ant-form-item-label">现存：</span>
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                      </div>

                    )}
              </Col>
            </Row>
          </Form.Item>


          <Form.Item {...formItemLayout} label="分类">
            {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="书柜">
            {getFieldDecorator('owner2', {
                    rules: [{ required: true, message: '请选择管理员' }],
                  })(
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={onChange} />
                  )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="目标描述"
          >
            {getFieldDecorator('goal', {
              rules: [{
                required: true, message: '请输入目标描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
