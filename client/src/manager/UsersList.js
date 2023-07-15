import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'

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

export default function VacationsStatus() {
    const [vacationRequests, setVacationRequests] = useState([])

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
                            <a>edit</a> <a>delete</a>
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
                List of users
            </h2>
            <Button>Create User</Button>
            <Table
                dataSource={vacationRequests}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
