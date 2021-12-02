import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import configuration from '../../../config';
import CustomAlert from '../../utilities/customs/CustomAlert/CustomAlert';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import validate from 'validator';
import './registration.scss';

export default function Registration(props) {

    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [retypePassword, setretypePassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [lnerror, setlnerror] = useState('');
    const [fnerror, setfnerror] = useState('');

    const [unerror, setunerror] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [retypeError, setretypeError] = useState('');
    const [emailerror, setemailerror] = useState('');

    const [variant, setvariant] = useState('');
    const [message, setmessage] = useState('');
    const [alert, setalert] = useState(false);

    const alertUser = () => {
        setalert(true);
    }


    const handleEmail = (e) => {
        setemail(e.target.value);
    }

    const validateEmail = (e) => {
        if(validate.isEmail(e.target.value)) {
            setemailerror('')
        } else {
            setemailerror('Invalid email address :(');
        }
    }

    const handleUsername = (e) => {
        setusername(e.target.value);
    }
    const handleFirstName = (e) => {
        setfirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setlastName(e.target.value);
    }

    const validateName = (e) => {
        if (validate.isAlpha(firstName) === false ) {
            setfnerror('Please provide a valid first name :(')
            setlnerror('')
            
        } else if (firstName.trim().length > 0 && validate.isAlpha(lastName) === false) {
            setlnerror('Please provide a valid last name :(')
            setfnerror('');
        } else {
            setfnerror('');
            setlnerror('');
        }
    }
    const handlePassword = (e) => {
        setpassword(e.target.value);
        setretypePassword('');
    }

    const handleRetype = (e) => {
        setretypePassword(e.target.value);
    }

    const validateRetypePassword = (e) => {
        if(retypePassword === password) {
            setretypeError('')
        } else {
            setretypeError('Passwords do not match!')
        }
    }

    const validateUsername = (e) => {
        // check if the username exists in the DB

        if (e.target.value.trim().length !== 0 && validate.isAlphanumeric(e.target.value)) {
            fetch(`${configuration.URL}/validate/${e.target.value.toLowerCase()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) =>
                response.json()
            ).then((data) => {
                console.log(data);
                if (data.message === "success") {
                    setunerror("This username is taken! Please pick another one!");
                    setTimeout(() => {
                        setunerror("");
                        setusername("");
                    }, 3000);

                } else {
                    setunerror("");
                }
            })
                .catch((err) => {
                    console.log(err, " _________________________ ");
                    setvariant('danger');
                    setmessage('Oops! Something went wrong x(');
                    alertUser();

                })
        } else {
            setunerror('Please use a valid username! A username could be alphanumeric.')
        }
    }

    const userSignUp = (e) => {

        e.preventDefault();

        let data = {
            email: email,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }

        if (unerror === '' && passwordError == '' && retypeError == '' && fnerror === '' && lnerror === '' && emailerror === '') {
            fetch(`${configuration.URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data, " ::: ");
                    if (data.message === "success") {
                        setvariant('success');
                        setmessage('Registration successful!');
                        alertUser();

                        setTimeout(() => {
                            props.closeAdministration();
                        }, 1000);
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
        } else {
            setvariant('danger');
            setmessage('Looks like you have missed something!');
            alertUser();
        }

    const userNameHandler = (event) =>{
        setUsername(event.target.value);
    }
    const passwordHandler = (event) =>{
        setPassword(event.target.value)
    }
    const firstNameHandler = (event) =>{
        setFirstName(event.target.value)
    }
    const lastNameHandler = (event) =>{
        setLastName(event.target.value)
    }
    const registerUserOnChat = async(e)=>{
        const authObject={'PRIVATE-KEY':'6e604667-7878-480b-b9d0-cc41b6eff929'}
        const data={
            "username": username,
            "first_name": firstName,
            "last_name": lastName,
            "secret": password,
        }
        try{
            await axios.post("https://api.chatengine.io/users/",data,{headers:authObject});
            localStorage.setItem('username',username);
            localStorage.setItem('password',password)
        }catch(error){
            setError("Something went wrong!")
        }
    }
    const userSignUp = () => {
        registerUserOnChat();
    }

    return (
        <div className="container-form">
            {alert ? <CustomAlert variant={variant} message={message} show={true} /> : <></>}

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onBlur={validateEmail} onChange={handleEmail} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Text className="error-text"> {emailerror} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" placeholder="First Name" onChange={firstNameHandler}/>
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" onChange={lastNameHandler}/>
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" value={username} onChange={handleUsername} onBlur={validateUsername} />
                    <Form.Text className="error-text"> {unerror} </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateName} onChange={handleFirstName} required>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="username" placeholder="Enter name" value={firstName}  />
                    <Form.Text className="error-text"> {fnerror} </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateName} onChange={handleLastName} required>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="username" placeholder="Enter last name" value={lastName}  />
                    <Form.Text className="error-text"> {lnerror} </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} onBlur={validateRetypePassword} />
                    <Form.Text className="error-text"> {passwordError} </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={retypePassword} onChange={handleRetype} />
                    <Form.Text className="error-text"> {retypeError} </Form.Text>
                </Form.Group>

                <div className="container-form-btn">

                    <CustomButton variant={"lightButton"} text={"SIGN UP"} clickFn={userSignUp} />
                    <div>
                        Already have an account with us?
                        <a href="/signIn" > Log In. </a>
                    </div>

                </div>
                <h2 className="error">
                    {error}
                </h2>
            </Form>
        </div>
    )
}
