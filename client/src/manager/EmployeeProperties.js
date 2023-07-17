import React, { useState, useEffect } from 'react'
import { Button, Input, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Return from '../Return'

export default function EmployeeProperties() {
    const [form] = Form.useForm()
    const [userProperties, setUserProperties] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserProperties((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    let { email } = useParams()
    email = email ?? 'email'

    useEffect(() => {
        if (email !== 'email') {
            setUserProperties({ ...userProperties, user: email })
        }
    }, [email])

    const handleSubmit = () => {
        if (email === 'email') {
            axios
                .post('http://localhost:8888/create', userProperties)
                .then((response) => {
                    console.log('user created')
                })
                .catch((error) => {
                    console.log(error)
                })
            setTimeout(() => {
                alert('user created')
            }, 0)
            form.resetFields()
        } else {
            console.log(userProperties)
            axios
                .put('http://localhost:8888/update', {
                    name: userProperties.name,
                    email: userProperties.email,
                    password: userProperties.password,
                    user: userProperties.user,
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
            setTimeout(() => {
                alert('user created')
            }, 0)
            form.resetFields()
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '85vh',
                width: '99vw',
            }}
        >
            <Return />
            <div style={{ width: '600px' }}>
                <h2 style={{ textAlign: 'center' }}>User properties</h2>
                <Form
                    form={form}
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
                            onChange={handleInputChange}
                            name="name"
                            value={userProperties.name}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{ marginTop: '20px' }}
                    >
                        <Input
                            placeholder={email}
                            allowClear
                            className="formInput"
                            name="email"
                            value={userProperties.email}
                            onChange={handleInputChange}
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
                            value={userProperties.password}
                            name="password"
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginLeft: '50px',
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={handleSubmit}
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
