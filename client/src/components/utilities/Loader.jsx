import React from 'react'
import { Spinner } from 'react-bootstrap'
import './loader.scss';

function Loader() {
    return (
        <div className="loader__main">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
        </div>
    )
}

export default Loader
