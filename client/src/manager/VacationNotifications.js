import React, { useState, useEffect } from 'react'
import { BellOutlined, BellFilled } from '@ant-design/icons'
import { Dropdown, Menu, Button } from 'antd'
import axios from 'axios'

export default function VacationNotifications() {
    const [isHovered, setIsHovered] = useState(false)
    const [vacationRequests, setVacationRequests] = useState([])

    const handleHover = (hoverState) => {
        setIsHovered(hoverState)
    }

    const handleRequest = (decision, vacationId, index) => {
        const data = {
            managerDecision: decision,
            vacationRequestedId: vacationId,
        }
        axios
            .put('http://localhost:8888/handleRequest', data)
            .then((response) => {
                setVacationRequests((prevRequests) =>
                    prevRequests.filter((item) => item.key !== index + 1)
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        axios
            .get('http://localhost:8888/allRequests')
            .then((response) => {
                const formattedData = response.data.map((item, index) => ({
                    key: index + 1,
                    label: (
                        <>
                            <span style={{ fontWeight: 'bold' }}>
                                {item.username}
                            </span>
                            : From:
                            {item.vacation_date_from}/ Until:
                            {item.vacation_date_to}/ Reason: {item.reason}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        handleRequest(
                                            'approved',
                                            item.id,
                                            index
                                        )
                                    }
                                >
                                    Approve
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleRequest(
                                            'rejected',
                                            item.id,
                                            index
                                        )
                                    }
                                    style={{ backgroundColor: 'red' }}
                                >
                                    Reject
                                </Button>
                            </div>
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
            <Dropdown
                overlay={
                    <Menu style={{ minHeight: '80px' }}>
                        {vacationRequests.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                disabled={item.disabled}
                                danger={item.danger}
                            >
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu>
                }
                placement="bottomRight"
            >
                <Button
                    type="primary"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                    icon={
                        isHovered ? (
                            <BellFilled style={{ fontSize: '24px' }} />
                        ) : (
                            <BellOutlined style={{ fontSize: '24px' }} />
                        )
                    }
                    className="notifications"
                    shape="circle"
                ></Button>
            </Dropdown>
        </div>
    )
}
