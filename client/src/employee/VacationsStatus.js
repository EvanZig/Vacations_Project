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

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        email: 32,
        dev: 'delete',
    },
    {
        key: '2',
        name: 'John',
        email: 42,
        dev: (
            <>
                <a>edit</a> <a>delete</a>
            </>
        ),
    },
]

export default function VacationsStatus() {
    const [vacationRequests, setVacationRequests] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:5000/show')
            .then((response) => {
                console.log(response.data)
                const parsedData = JSON.parse(response.data)
                setVacationRequests(parsedData)
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
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
