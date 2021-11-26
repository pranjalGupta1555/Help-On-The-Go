import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import './Registration.scss';
import axios from 'react-chat-engine/node_modules/axios';
import { useHistory } from 'react-router-dom';

export default function Registration(props) {

    const[password, setPassword] = useState('');
    const[username, setUsername] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setLastName] = useState('');
    const[error, setError] = useState('');
    const navigate = useHistory();

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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Text className="error-text">  </Form.Text>
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
                    <Form.Control type="username" placeholder="Username" onChange={userNameHandler}/>
                    <Form.Text className="error-text">  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={passwordHandler}/>
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
