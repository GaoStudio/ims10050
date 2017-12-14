import React, { Component } from 'react';
import {
  Input,
  Form,
  Select,
} from 'antd';

const { Option } = Select;
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
    return (
      <div>
        <Form hideRequiredMark>
          <Form.Item {...formItemLayout} label="书名">
            {getFieldDecorator('name2', {
                    rules: [{ required: true, message: '请输入' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="作者">
            {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <Input placeholder="请输入" />
                  )}
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
        </Form>
      </div>
    );
  }
}
