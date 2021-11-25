import React from 'react'
import { Dropdown } from 'react-bootstrap'
import './service.scss'


function ServiceProvider() {
    return (
        <div className="service-layout">
            <div className="content-filter">

                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Choose location
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic1">
                            Choose price range
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {/* list of all the help providers for the service */}
            <div className="content-services-providers">

            </div>
        </div>
    )
}

export default ServiceProvider
