import React, { useContext, useState } from 'react'
import { DatePicker, Input, Button } from 'antd'
import axios from 'axios'
import { AuthContext } from '../Routes/context'

const { TextArea } = Input

export default function VacationRequest() {
    const [dateStrings, setDateStrings] = useState({
        dateFrom: '',
        dateTo: '',
        reason: '',
    })
    const authContext = useContext(AuthContext)

    const onChange = (identifier, value) => {
        setDateStrings((prevState) => ({
            ...prevState,
            [identifier]: value,
        }))
    }

    const onDateChange = (identifier, date, dateString) => {
        onChange(identifier, dateString)
    }

    const request = () => {
        const currentDate = new Date()
        const formattedCurrentDate = currentDate.toISOString().slice(0, 10)

        const requestData = {
            ...dateStrings,
            currentDate: formattedCurrentDate,
        }
        axios
            .post('http://localhost:8888/request', requestData, {
                headers: {
                    Authorization: `Bearer ${authContext.token}`,
                },
            })
            .then((response) => {
                console.log(response.data)
                alert('Vacation Requested Submitted')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '90vh',
            }}
        >
            <div style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center' }}>Vacation Request</h2>
                <div style={{ marginTop: '20px' }}>
                    <label>Date from: </label>
                    <DatePicker
                        onChange={(date, dateString) =>
                            onDateChange('dateFrom', date, dateString)
                        }
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label>Date to: </label>
                    <DatePicker
                        onChange={(date, dateString) =>
                            onDateChange('dateTo', date, dateString)
                        }
                        style={{ marginLeft: '20px' }}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label>Reason: </label>
                    <TextArea
                        showCount
                        maxLength={100}
                        className="textarea-reason"
                        onChange={(e) => onChange('reason', e.target.value)}
                        placeholder="Add reason"
                    />
                </div>
                <Button
                    style={{ marginTop: '60px', marginLeft: '150px' }}
                    onClick={request}
                >
                    Request
                </Button>
            </div>
        </div>
    )
}
