import { Button, Input, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import './styles/login.scss'

function App() {
    return (
        <div className="Sign-In">
            <Form
                labelCol={{ flex: '80px' }}
                labelAlign="left"
                labelWrap
                style={{ maxWidth: 600 }}
            >
                <h2 className="title">Sign in</h2>
                <Form.Item
                    label="Username"
                    name="username"
                    className="formItem"
                >
                    <Input
                        placeholder="Username"
                        allowClear
                        className="formInput"
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    className="formItem"
                >
                    <Input.Password
                        placeholder="Password"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        className="formInput"
                    />
                </Form.Item>
                <div className="footer" style={{ marginTop: '10px' }}>
                    <Button type="primary" htmlType="submit">
                        LOGIN
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default App
