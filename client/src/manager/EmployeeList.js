import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import { Link } from 'react-router-dom'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '',
        dataIndex: 'dev',
        key: 'dev',
    },
]

export default function EmployeeList() {
    const [vacationRequests, setVacationRequests] = useState([])

    useEffect(() => {
        async function employeeDelete(employeeEmail) {
            axios
                .delete('http://localhost:8888/delete', {
                    email: employeeEmail,
                })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        axios
            .get('http://localhost:8888/allEmployees')
            .then((response) => {
                console.log(response.data)
                const formattedData = response.data.map((item, index) => ({
                    key: index + 1,
                    name: item.username,
                    email: item.email,
                    dev: (
                        <>
                            <Link to={`/employeeProperties/${item.email}`}>
                                edit
                            </Link>{' '}
                            /{' '}
                            <a onClick={() => employeeDelete(item.email)}>
                                delete
                            </a>
                        </>
                    ),
                }))
                setVacationRequests(formattedData)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                List of employees
            </h2>
            <Link to="/employeeProperties">
                <Button>Create Employee</Button>
            </Link>
            <Table
                dataSource={vacationRequests}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}