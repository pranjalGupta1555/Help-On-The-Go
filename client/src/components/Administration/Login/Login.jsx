import React from 'react';
import { Form } from 'react-bootstrap';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { actionTypes } from '../../../reducer';
import { useStateValue } from '../../../StateProvider';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import './login.scss';

export default function Login(props) {
    const [{ userCredentials }, dispatch] = useStateValue();
    const history = useHistory();

    const userLogin = () => {
        console.log("CAME TO LOGIN");
        dispatch({
            type: actionTypes.SET_LOGIN,
            username: "Nidhi"
        })
    }

    return (

        <div className="container-form">
            <FaRegTimesCircle className="close" onClick={(e) => {
                e.preventDefault();
                document.body.style.overflow = "auto";
                history.push("/");
            } } />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <div className="container-form-btn">

                    <CustomButton variant={"darkButton"} text={"login"} clickFn={userLogin} />
                    <div>
                        You don't have an account with us?
                        <a href="#" onClick={props.setToggle}> Sign Up. </a>
                    </div>

                </div>
            </Form>
        </div>

    )
}
