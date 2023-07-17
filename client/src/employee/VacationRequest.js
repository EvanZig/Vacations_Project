import React, { useContext, useState } from 'react'
import { DatePicker, Input, Button, Form } from 'antd'
import axios from 'axios'
import { AuthContext } from '../Routes/context'
import Return from '../Return'
import { useForm } from 'antd/es/form/Form'

const { TextArea } = Input

export default function VacationRequest() {
    const [form] = useForm()
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
                form.resetFields()
                alert('Vacation Requested Submitted')
            })
            .catch((error) => {
                console.log(error)
                form.resetFields()
                alert('Vacation Request failed')
            })
        form.resetFields()
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
            <Return />
            <Form form={form}>
                <div style={{ width: '400px' }}>
                    <h2 style={{ textAlign: 'center' }}>Vacation Request</h2>
                    <div style={{ marginTop: '20px' }}>
                        <Form.Item
                            label="Date from:"
                            name="dateFrom"
                            style={{ marginTop: '20px' }}
                        >
                            <DatePicker
                                onChange={(date, dateString) =>
                                    onDateChange('dateFrom', date, dateString)
                                }
                                name="dateFrom"
                            />
                        </Form.Item>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Form.Item
                            label="Date from:"
                            name="dateTo"
                            style={{ marginTop: '20px' }}
                        >
                            <DatePicker
                                onChange={(date, dateString) =>
                                    onDateChange('dateTo', date, dateString)
                                }
                                name="dateTo"
                            />
                        </Form.Item>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Form.Item label="Date from:" name="reason">
                            <TextArea
                                showCount
                                maxLength={100}
                                className="textarea-reason"
                                onChange={(e) =>
                                    onChange('reason', e.target.value)
                                }
                                placeholder="Add reason"
                                name="reason"
                            />
                        </Form.Item>
                    </div>
                    <Button
                        style={{ marginTop: '60px', marginLeft: '150px' }}
                        onClick={request}
                    >
                        Request
                    </Button>
                </div>
            </Form>
        </div>
    )
}
