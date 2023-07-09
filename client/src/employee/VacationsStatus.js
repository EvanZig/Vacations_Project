import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'

const columns = [
    {
        title: 'Date submitted',
        dataIndex: 'dateSubmitted',
        key: 'dateSubmitted',
    },
    {
        title: 'Date requested',
        dataIndex: 'dateRequested',
        key: 'dateRequested',
    },
    {
        title: 'total days',
        dataIndex: 'totalDays',
        key: 'totalDays',
    },
    {
        title: 'reason',
        dataIndex: 'reason',
        key: 'reason',
    },
    {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
    },
]

const dataSource = [
    {
        key: '1',
        dateSubmitted: 'Mike',
        totalDays: 32,
        status: 'delete',
    },
    {
        key: '2',
        dateSubmitted: 'John',
        totalDays: 42,
        status: (
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
                Vacation Requests
            </h2>
            <Button>Request vacation</Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
