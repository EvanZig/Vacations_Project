import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import { AuthContext } from '../Routes/context'
import { Link } from 'react-router-dom'

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

export default function VacationsStatus() {
    const [vacationRequests, setVacationRequests] = useState([])
    const authContext = useContext(AuthContext)

    const calculateDays = (startDate, endDate) => {
        const dateFrom =
            typeof startDate === 'string' ? new Date(startDate) : startDate
        const dateTo = typeof endDate === 'string' ? new Date(endDate) : endDate

        // Calculate the difference in milliseconds
        const differenceMs = dateTo - dateFrom

        // Convert milliseconds to days
        const oneDayInMs = 1000 * 60 * 60 * 24
        const numberOfDays = Math.round(differenceMs / oneDayInMs)
        return numberOfDays
    }

    useEffect(() => {
        axios
            .get('http://localhost:8888/allVacations', {
                headers: {
                    Authorization: `Bearer ${authContext.token}`,
                },
            })
            .then((response) => {
                console.log(response.data)
                const formattedData = response.data.map((item, index) => ({
                    key: index + 1,
                    dateSubmitted: item.submissionDate,
                    dateRequested: item.vacation_date_from,
                    totalDays: calculateDays(
                        item.vacation_date_from,
                        item.vacation_date_to
                    ),
                    reason: item.reason,
                    status: item.status,
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
                Vacation Requests
            </h2>
            <Link to="/request">
                <Button>Request vacation</Button>
            </Link>
            <Table
                dataSource={vacationRequests}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}
