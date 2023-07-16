import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VacationsStatus from '../employee/VacationsStatus'
import VacationRequest from '../employee/VacationRequest'
import EmployeeProperties from '../manager/EmployeeProperties'
import EmployeeList from '../manager/EmployeeList'
import Login from '../Login'
import AuthProvider, {
    AuthIsNotSignedIn,
    AuthIsSignedIn,
    IsManager,
    IsNotManager,
    AuthContext,
} from './context'
import Logout from '../Logout'

const ManagerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route
                path="/employeeProperties"
                element={<EmployeeProperties />}
            />
            <Route
                path="/employeeProperties/:email"
                element={<EmployeeProperties />}
            />
        </Routes>
    )
}

const EmployeeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<VacationsStatus />} />
        </Routes>
    )
}

export default function MyRoutes() {
    const authContext = useContext(AuthContext)

    // session info
    useEffect(() => {
        try {
            const isAuthenticated = localStorage.getItem('status')
            authContext.setAuthStatus(isAuthenticated)
            authContext.setRole(localStorage.getItem('role'))
            authContext.setToken(localStorage.getItem('token'))
        } catch (e) {}
    }, [authContext])

    return (
        <BrowserRouter>
            <AuthIsNotSignedIn>
                <Login />
            </AuthIsNotSignedIn>
            <AuthIsSignedIn>
                <Logout />
                <IsManager>
                    <ManagerRoutes />
                </IsManager>
                <IsNotManager>
                    <EmployeeRoutes />
                </IsNotManager>
            </AuthIsSignedIn>
        </BrowserRouter>
    )
}
