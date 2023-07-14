import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import VacationsStatus from './employee/VacationsStatus'
import UsersList from './manager/UsersList'
import UserCreation from './manager/UserCreation'
import VacationRequest from './employee/VacationRequest'
import './styles/general.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
        {/* <UsersList /> */}
        {/* <UserCreation /> */}
        {/* <VacationsStatus /> */}
        {/* <VacationRequest /> */}
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
