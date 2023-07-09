import React from 'react'
import { Button, Input, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

export default function UserCreation() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '600px' }}>
                <h2 style={{ textAlign: 'center' }}>User properties</h2>
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    labelCol={{ flex: '80px' }}
                    labelAlign="left"
                    labelWrap
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ marginTop: '20px' }}
                    >
                        <Input
                            placeholder="name"
                            allowClear
                            className="formInput"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{ marginTop: '20px' }}
                    >
                        <Input
                            placeholder="email"
                            allowClear
                            className="formInput"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        className="formItem"
                        style={{ marginTop: '20px' }}
                    >
                        <Input.Password
                            placeholder="Password"
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            className="formInput"
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100px' }}
                        >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
