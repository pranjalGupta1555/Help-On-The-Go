import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaEject, FaRegTimesCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { actionTypes } from '../../../reducer';
import { useStateValue } from '../../../StateProvider';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import CustomAlert from '../../utilities/customs/CustomAlert/CustomAlert';
import configuration from '../../../config';

import './login.scss';

export default function Login(props) {
    const [{ userCredentials }, dispatch] = useStateValue();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [unerror, setunerror] = useState('');
    const [passwordError, setpasswordError] = useState('');

    // alert management
    const [alert, setalert] = useState(false);
    const [message, setmessage] = useState("");
    const [variant, setvariant] = useState("");

    const history = useHistory();

    const alertUser = () => {
        setalert(true);
    }

    const handleUsername = (e) => {
        setusername(e.target.value);
    }

    const handlePassword = (e) => {
        setpassword(e.target.value);
    }

    const validateUsername = (e) => {
        // check if the username exists in the DB

        if (e.target.value.trim().length !== 0) {
            fetch(`${configuration.URL}/validate/${e.target.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) =>
                response.json()
            ).then((data) => {
                console.log(data);
                if (data.message === "success") {
                    setunerror('');

                } else {
                    setunerror("This username is not registered with us!");
                    setTimeout(() => {
                        setunerror("");
                        setusername("");
                    }, 3000);

                }
            })
                .catch((err) => {
                    console.log(err, " _________________________ ");
                    setvariant('danger');
                    setmessage('Oops! Something went wrong x(');
                    alertUser();

                })
        }

    }


    const validatePassword = (e) => {

        if (e.target.value.length === 0 || e.target.value.includes(' ')) {
            setpasswordError('Invalid password!');
        } else {
            setpasswordError('');
        }

    }


    const userLogin = (e) => {
        console.log("CAME TO LOGIN");
        e.preventDefault();

        let data = {
            username: username,
            password: password
        }

        if (passwordError === "" && unerror === "") {
            fetch(`${configuration.URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((data) => {
                    dispatch({
                        type: actionTypes.SET_LOGIN,
                        username: data.data.username,
                        sessionToken: data.data.token
                    })

                    setvariant('success');
                    setmessage('Login successful!');
                    alertUser();

                    props.closeAdministration();

                }).catch((err) => {
                    setvariant('danger');
                    setmessage('Oops! Something went wrong x(');
                    alertUser();
                })
        }



    }

    return (

        <div className="container-form">
            {alert ? <CustomAlert variant={variant} message={message} show={true} /> : <></>}

            <FaRegTimesCircle className="close" onClick={(e) => {
                e.preventDefault();
                document.body.style.overflow = "auto";
                
                props.closeAdministration();
            }} />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateUsername} onChange={handleUsername}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" value={username} />
                    <Form.Text className="error-text"> {unerror} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onBlur={validatePassword} >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                    <Form.Text className="error-text"> {passwordError} </Form.Text>

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
