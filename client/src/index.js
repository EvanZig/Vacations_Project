import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import reportWebVitals from './reportWebVitals'
import './styles/general.scss'
import MyRoutes from './Routes/MyRoutes'
import AuthProvider from './Routes/context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <AuthProvider>
            <MyRoutes />
        </AuthProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
