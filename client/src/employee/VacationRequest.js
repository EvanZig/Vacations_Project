import React from 'react'
import { DatePicker, Input, Button } from 'antd'

const { TextArea } = Input

export default function VacationRequest() {
    const onChange = (date, dateString) => {
        console.log(date, dateString)
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
                    <DatePicker onChange={onChange} />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label>Date to: </label>
                    <DatePicker
                        onChange={onChange}
                        style={{ marginLeft: '20px' }}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label>Reason: </label>
                    <TextArea
                        showCount
                        maxLength={100}
                        className="textarea-reason"
                        onChange={onChange}
                        placeholder="Add reason"
                    />
                </div>
                <Button style={{ marginTop: '60px', marginLeft: '150px' }}>
                    Request
                </Button>
            </div>
        </div>
    )
}
