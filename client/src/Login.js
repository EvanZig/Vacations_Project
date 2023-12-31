import { Button, Input, Form } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from './Routes/context'

function App() {
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: '',
    })
    const authContext = useContext(AuthContext)
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const submitLogin = () => {
        console.log(loginCredentials)
        axios
            .post('http://localhost:8888/login', loginCredentials)
            .then((response) => {
                const { role } = response.data
                const { token } = response.data
                authContext.setAuthStatus('LoggedIn')
                authContext.setRole(role)
                authContext.setToken(token)
                window.localStorage.setItem('role', role)
                window.localStorage.setItem('status', 'LoggedIn')
                window.localStorage.setItem('token', token)
            })
            .catch((error) => {
                setWrongCredentials(true)
                console.error(error)
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submitLogin()
                            }
                        }}
                    />
                    {wrongCredentials ? (
                        <span className="errorLogin">
                            wrong username or password
                        </span>
                    ) : null}
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
