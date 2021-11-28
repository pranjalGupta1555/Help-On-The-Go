import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import configuration from '../../../config';
import CustomAlert from '../../utilities/customs/CustomAlert/CustomAlert';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import './Registration.scss';

export default function Registration(props) {

    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [retypePassword, setretypePassword] = useState('');


    const [unerror, setunerror] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [retypeError, setretypeError] = useState('');

    const [variant, setvariant] = useState('');
    const [message, setmessage] = useState('');
    const [alert, setalert] = useState(false);

    const alertUser = () => {
        setalert(true);
    }    


    const handleEmail = (e) => {
        setemail(e.target.value);
    }

    const handleUsername = (e) => {
        setusername(e.target.value);
    }

    const handlePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleRetype = (e) => {
        setretypePassword(e.target.value);
    }

    const userSignUp = (e) => {

        e.preventDefault();

        let data = {
            email: email,
            username: username,
            password: password
        }

        if(unerror === '' && passwordError == '' && retypeError == '') {
            fetch(`${configuration.URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
            .then((data) => {
                console.log(data, " ::: ");
                if(data.message === "success") {
                    setvariant('success');
                    setmessage('Registration successful!');
                    alertUser();

                    props.closeAdministration();
                } else {
                    setvariant('danger');
                    setmessage('Failed!');
                    alertUser();
                }
            }).catch((err) => {
                setvariant('danger');
                setmessage('Oops! Something went wrong x(');
                alertUser();
            })
        }


    }

    return (
        <div className="container-form">
            { alert ? <CustomAlert variant={variant} message={message} show={true} /> : <></> }

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />

                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" value={username} onChange={handleUsername} />

                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />

                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={retypePassword} onChange={handleRetype} />

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
