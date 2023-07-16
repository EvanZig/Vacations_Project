import React, { useState, useContext, useEffect } from 'react'

//Defining default state and creating it
const defaultState = {
    authStatus: 'LoggedOut',
    role: '',
}

export const AuthContext = React.createContext(defaultState)

export const AuthIsSignedIn = ({ children }) => {
    const { authStatus } = useContext(AuthContext)

    return <>{authStatus === 'LoggedIn' ? children : null}</>
}

export const AuthIsNotSignedIn = ({ children }) => {
    const { authStatus } = useContext(AuthContext)

    return <>{authStatus === 'LoggedOut' ? children : null}</>
}

export const IsManager = ({ children }) => {
    const { role } = useContext(AuthContext)

    return <>{role === 'manager' ? children : null}</>
}

export const IsNotManager = ({ children }) => {
    const { role } = useContext(AuthContext)

    return <>{role === 'employee' ? children : null}</>
}

export const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState('LoggedOut')
    const [token, setToken] = React.useState('')
    const [role, setRole] = useState('')

    const state = {
        authStatus,
        setAuthStatus,
        role,
        setRole,
        token,
        setToken,
    }

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export default AuthProvider
