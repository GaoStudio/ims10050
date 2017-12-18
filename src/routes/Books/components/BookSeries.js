import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Cascader,
  Button,
  Card,
  InputNumber,
  Radio,
} from 'antd';
import styles from '../BookStore.less';

const { Option } = Select;
const { TextArea } = Input;
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
@Form.create()
export default class BookSeries extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  onChange = (value) => {
    console.log(value);
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 7,
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 20, offset: 0 },
        sm: { span: 20, offset: 10 },
      },
    };

    return (
      <Card bordered>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          <Form.Item {...formItemLayout} label="ISBN">
            <Row gutter={8}>
              <Col span={20}>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ],
                })(<Input placeholder="请输入书的ISBN号" />)}
              </Col>
              <Col span={4}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...formItemLayout} label="书名">
            {getFieldDecorator('client')(<Input placeholder="水浒传" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="作者">
            {getFieldDecorator('author')(<Input placeholder="水浒传" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="出版社">
            {getFieldDecorator('Press')(<Input placeholder="人民日报出版社" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="分类">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('category', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ],
                })(<Input placeholder="请输入书的ISBN号" />)}
              </Col>
              <Col span={12}>
                <Select placeholder="请选择管理员">
                  <Option value="xiao">付晓晓</Option>
                  <Option value="mao">周毛毛</Option>
                </Select>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...formItemLayout} label="位置">
            {getFieldDecorator('location')(
              <Cascader
                defaultValue={['zhejiang', 'hangzhou', 'xihu']}
                options={options}
                onChange={this.onChange}
              />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label={
              <span>
                简单描述<em className={styles.optional}>（选填）</em>
              </span>
            }
          >
            {getFieldDecorator('goal', {
              rules: [
                {
                  required: true,
                  message: '请输入目标描述',
                },
              ],
            })(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="请输入你的阶段性工作目标"
                rows={4}
              />
            )}
          </Form.Item>
          <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: 8 }}>保存</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
