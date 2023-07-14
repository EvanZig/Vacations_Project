import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VacationsStatus from '../employee/VacationsStatus'
import VacationRequest from '../employee/VacationRequest'
import UserCreation from '../manager/UserCreation'
import UsersList from '../manager/UsersList'
import Login from '../Login'
import AuthProvider, {
    AuthIsNotSignedIn,
    AuthIsSignedIn,
    IsManager,
    IsNotManager,
} from './context'

const ManagerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UsersList />} />
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
    return (
        <BrowserRouter>
            <AuthProvider>
                <AuthIsNotSignedIn>
                    <Login />
                </AuthIsNotSignedIn>
                <AuthIsSignedIn>
                    <IsManager>
                        <ManagerRoutes />
                    </IsManager>
                    <IsNotManager>
                        <EmployeeRoutes />
                    </IsNotManager>
                </AuthIsSignedIn>
            </AuthProvider>
        </BrowserRouter>
    )
}
