import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <div>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
        </div>
    )
}

export default Loader
