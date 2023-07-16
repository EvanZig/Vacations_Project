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
    const [employeeList, setEmployeeList] = useState([])

    async function employeeDelete(employeeEmail) {
        console.log(employeeEmail)
        axios
            .delete('http://localhost:8888/delete', {
                data: {
                    email: employeeEmail,
                },
            })
            .then((response) => {
                console.log(response)
                setEmployeeList((prevVacationRequests) =>
                    prevVacationRequests.filter(
                        (item) => item.email !== employeeEmail
                    )
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
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
                setEmployeeList(formattedData)
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
                dataSource={employeeList}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
