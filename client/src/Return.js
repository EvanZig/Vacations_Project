import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Return() {
    return (
        <div>
            <Link to="/">
                <Button className="returnButton">Return</Button>
            </Link>
        </div>
    )
}
