import { Button } from 'antd'
import React, { useContext } from 'react'
import { AuthContext } from './Routes/context'

export default function Logout() {
    const authContext = useContext(AuthContext)
    function handleLogout() {
        localStorage.setItem('role', '')
        localStorage.setItem('status', 'LoggedOut')
        authContext.setRole('')
        authContext.setAuthStatus('LoggedOut')
    }
    return (
        <div className="">
            <Button onClick={handleLogout} className="logoutButton">
                Logout
            </Button>
        </div>
    )
}
