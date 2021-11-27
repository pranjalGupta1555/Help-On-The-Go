import React from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import './Registration.scss';

export default function Registration(props) {

    const userSignUp = () => {

    }

    return (
        <div className="container-form">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" />
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <div className="container-form-btn">

                    <CustomButton variant={"lightButton"} text={"SIGN UP"} clickFn={userSignUp} />
                    <div>
                        Already have an account with us?
                        <a href="#" onClick={props.setToggle} > Log In. </a>
                    </div>

                </div>

            </Form>
        </div>
    )
}
