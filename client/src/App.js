import { Button, Input, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'

function App() {
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const submitLogin = () => {
        axios
            .post(
                'http://localhost/Epignosis_Evan_Zig/server/routes/login.php',
                loginCredentials
            )
            .then((response) => {
                console.log(response.data)
                // Handle the response data here, such as displaying a success message or redirecting to another page
            })
            .catch((error) => {
                console.error(error)
                // Handle the error here, such as displaying an error message
            })
    }

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
                        name="username"
                        value={loginCredentials.username}
                        onChange={handleInputChange}
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
                        name="password"
                        value={loginCredentials.password}
                        onChange={handleInputChange}
                    />
                </Form.Item>
                <div className="footer" style={{ marginTop: '10px' }}>
                    <Button type="primary" onClick={submitLogin}>
                        LOGIN
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default App
