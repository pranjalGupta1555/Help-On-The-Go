import React, { useEffect, useState } from 'react'
import { Carousel, Dropdown, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useStateValue } from '../../../Store/StateProvider';
import configuration from '../../../config';
import './join.scss';
import validate from 'validator';
import CustomDropdown from '../../utilities/customs/CustomDropdown/CustomDropdown';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import CustomAlert from '../../utilities/customs/CustomAlert/CustomAlert';
import emailjs from 'emailjs-com';
import cool from '../../../assets/cool.jpeg';
import { actionTypes } from '../../../Store/reducer';

/*

This component is used to register users in our application as helpers

A user who is a seeker can also register himself as a helper


*/
const useStyles = makeStyles({
    root: {
        width: 300,
        color: 'green'
    },
    backgroundColor: 'limegreen'
});

export default function Join() {

    const classes = useStyles();

    // State management
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const years = ['< 1 year', ' 1-2 years', '3-4 years', '> 5 years']

    const [{ userCredentials }, dispatch] = useStateValue();

    const [loggedin, setloggedin] = useState(false);

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [unerror, setunerror] = useState('');
    const [emerror, setemerror] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [retypepassword, setretypepassword] = useState('');
    const [retypepasswordError, setretypepasswordError] = useState('');
    const [email, setemail] = useState('');
    const [profilePicFile, setprofilePicFile] = useState(cool);
    const [domains, setdomains] = useState([]);
    const [skills, setskills] = useState([]);
    const [address, setaddress] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [description, setdescription] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [lnerror, setlnerror] = useState('');
    const [fnerror, setfnerror] = useState('');

    const [selectedDomain, setselectedDomain] = useState([]);
    const [selectedSkill, setselectedSkill] = useState([]);
    const [selectedLocation, setselectedLocation] = useState([]);
    const [wage, setwage] = useState('');
    const [experience, setexperience] = useState('');
    const [day, setday] = useState([]);
    const [location, setlocation] = useState([]);
    const [Image, setImage] = useState(null);
    const [domainSkillCombo, setdomainSkillCombo] = useState([]);

    const [field, setField] = useState(false);



    // alert management
    const [alert, setalert] = useState(false);
    const [message, setmessage] = useState("");
    const [variant, setvariant] = useState("");

    const [index, setindex] = useState(0);

    const history = useHistory();

    const valuetext = (value) => {
        setwage(value);
    }

    // handling the selected tab pane
    const handleSelect = (selectedIndex, e) => {
        setindex(selectedIndex);
    }

    // to display the custom alert
    const alertUser = () => {
        setalert(true);
    }

    // handle dropdown value change
    const handleDayChange = (e) => {
        setday(e.target.value);
    }

    // cascading dropdown effect between domain and skill
    const handleDomainChange = (e) => {

        let temporary = [];
        domainSkillCombo.map((item, index) => {
            console.log(("ITEM ", item.name, e.target.value));
            if (e.target.value.includes(item.name)) {
                console.log(item.skills);

                item.skills.map((itemSkill, index) => {
                    temporary.push(itemSkill.skillName);
                })
            }
        })

        setselectedDomain(e.target.value);
        setskills(temporary);
    }

    // handle skill change
    const handleSkillChange = (e) => {
        setselectedSkill(e.target.value);
    }

    // handle experience value change
    const handleExpChange = (e) => {
        setexperience(e.target.value);
    }

    // handle username change
    const handleUsername = (e) => {
        setusername(e.target.value);

    }

    const handleFirstName = (e) => {
        setfirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setlastName(e.target.value);
    }

    const handleTagLine = (e) => {
        setTagLine(e.target.value);
    }

    // validate the name field
    const validateName = (e) => {
        if (validate.isAlpha(firstName) === false) {
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

    const handleLocationChange = (e) => {
        setselectedLocation(e.target.value);

    }

    // API to join people
    const handleJoin = (e) => {

        if (username.trim().length > 0 && firstName.trim().length > 0 && lastName.trim().length > 0
            && email.length > 0 && password.length > 0 && retypepassword.length > 0 && selectedLocation.length > 0 &&
            selectedDomain.length > 0 && selectedSkill.length > 0) {

            if (unerror === "" && emerror === "" && passwordError === "" & retypepasswordError === "") {

                sendData();
            } else {
                setmessage("You have an invalid field!");
                setvariant('danger');
                alertUser();
            }

        } else {
            setmessage("Oops! Please fill all fields!");
            setvariant('danger');
            alertUser();
        }

    }

    // Upload image file AOI
    const uploadImage = (id, flg) => {
        const formData = new FormData();
        formData.append('upload', Image);

        fetch(`${configuration.URL}/upload/${id}`, {
            method: 'PUT',
            body: formData
        }).then((response) => response.json())
            .then((data) => {
                if (flg === true) {

                    const authObject = { 'PRIVATE-KEY': '6e604667-7878-480b-b9d0-cc41b6eff929', 'Content-type': 'application/json' }
                    const user = {
                        "username": username,
                        "first_name": firstName,
                        "last_name": lastName,
                        "secret": password,
                    }
                    fetch("https://api.chatengine.io/users/", {
                        method: 'POST',
                        headers: authObject,
                        body: JSON.stringify(user)
                    }).then(chatresp => {
                        console.log(user);
                        console.log(chatresp, " -- chat registered");

                        if (chatresp.status === 201) {
                            document.body.style.backgroundColor = 'white';
                            setmessage("Welcome to our community!");
                            setvariant('success');
                            alertUser();
                            sendEmail();
                            setTimeout(() => {
                                history.push('/');
                            }, 2000);
                        } else {
                            setmessage('Ran into trouble registering you! Please try again.');
                            setvariant('danger');
                            alertUser();
                        }

                    })
                } else {
                    if (data.message === "success") {
                        console.log(data, " ************* ");
                        document.body.style.backgroundColor = 'white';
                        setmessage("Welcome to our community!");
                        setvariant('success');
                        alertUser();
                        sendEmail();
                        setTimeout(() => {
                            history.push('/');
                        }, 2000);
                    } else {
                        setmessage('Please try again!');
                        setvariant('danger');
                        alertUser();
                    }
                }

            }).catch((err) => {
                console.log(err);
            })
    }
    //sending email when a new user Register themselves
    const sendEmail = () => {
        emailjs.send("service_htazc2e", "template_tdv6uw4", {
            from_name: "Help on the Go",
            to_name: firstName + " " + lastName,
            message: "Account has been created. Thank you for choosing us.",
            to_email: email,
            from_email: "udaysid7@gmail.com",
        }, "user_uCyIfbFyBbYuSeADhqEqj").then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    const sendData = () => {
        let formData = {
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            tagLine: tagLine,
            introductoryStatement: description,
            profileImage: profilePicFile,
            location: selectedLocation,
            skillset: selectedSkill,
            userType: 'helper',
            address: address,
            domains: selectedDomain,
            experience: experience,
            days: day,
            wage: wage,
        }


        if (loggedin) {
            // call update 
            fetch(`${configuration.URL}/join/${userCredentials.userDetails.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    dispatch({
                        type: actionTypes.SET_LOGIN,
                        username: data.data.username,
                        sessionToken: data.data.token,
                        userType: data.data.userType,
                        userData: data.data
                    });
                    uploadImage(data.data.id, false);


                }).catch((err) => {
                    console.log(err);
                    setmessage("Oops! Something went wrong!");
                    setvariant('danger');
                    alertUser();
                })
        } else {
            // call user post
            fetch(`${configuration.URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then((response) => response.json())
                .then((data) => {
                    dispatch({
                        type: actionTypes.SET_LOGIN,
                        username: data.data.username,
                        sessionToken: data.data.token,
                        userType: data.data.userType,
                        userData: data.data
                    });
                    uploadImage(data.data.id, true);


                }).catch((err) => {
                    console.log(err);
                    setmessage("Oops! Something went wrong!");
                    setvariant('danger');
                    alertUser();
                })
        }

    }

    const handleEmail = (e) => {
        if (!validate.isEmail(e.target.value)) {
            setemerror('Invalid Email Address :(');
        } else {
            setemail(e.target.value);
            setemerror('');
        }
    }

    const handlePassword = (e) => {
        setpassword(e.target.value);
    }

    const validateRetypePassword = (e) => {
        if (e.target.value === password) {
            setretypepasswordError('');
        } else {
            setretypepasswordError('Passwords do not match!');
        }
    }

    const handleRetypePassword = (e) => {
        setretypepassword(e.target.value);
    }

    const handleProfilePicture = (e) => {
        setprofilePicFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleDescription = (e) => {
        setdescription(e.target.value);
    }

    const handleAddress = (e) => {
        setaddress(e.target.value);
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
                    setvariant('danger');
                    setmessage('Oops! Something went wrong x(');
                    alertUser();

                })
        } else {
            setunerror('Please fill this field!')
        }

    }



    const validatePassword = (e) => {

        if (e.target.value.length === 0 || e.target.value.includes(' ')) {
            setpasswordError('Invalid password!');
        } else if (!validate.isStrongPassword(e.target.value)) {
            setpasswordError('Your password is weak')
        } else {
            setpasswordError('');
        }

    }


    const getAllDomains = () => {
        fetch(`${configuration.URL}/domains`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                console.log("DOMAINS ", data);
                setdomainSkillCombo(data);
                let temporary = [];
                {
                    data.map((item, index) => {
                        temporary.push(item.name);
                    })
                }
                setdomains(temporary);
            }).catch((err) => {
                console.log(err);
            })
    }

    const getLocations = () => {
        fetch(`${configuration.URL}/locations`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                setlocation(data.data[0].places);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        if (userCredentials.loggedIn) {
            // auto fill the username
            // disable the field

            setusername(userCredentials.username);
            setemail(userCredentials.userDetails.email);
            setpassword(userCredentials.userDetails.password);
            setretypepassword(userCredentials.userDetails.password);
            setfirstName(userCredentials.userDetails.firstName);
            setlastName(userCredentials.userDetails.lastName);
            setloggedin(true);

        }

        getAllDomains();
        getLocations();

    }, [userCredentials.loggedIn])

    return (
        <div className="join-container">
            {alert ? <CustomAlert variant={variant} message={message} show={true} /> : <></>}


            <Carousel activeIndex={index} onSelect={handleSelect} className="carousel" controls={false} wrap={true} interval={null}>
                <Carousel.Item>
                    <div className="form-container">
                        <Form>
                            <center>
                                <img className="profileImg" src={profilePicFile} height={120} width={120} />
                            </center>
                            <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateUsername} onChange={handleUsername} required>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter username" value={username} disabled={loggedin} />
                                <Form.Text className="error-text"> {unerror} </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateName} onChange={handleFirstName} required>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="username" placeholder="Enter name" value={firstName} disabled={loggedin} />
                                <Form.Text className="error-text"> {fnerror} </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicUsername" onBlur={validateName} onChange={handleLastName} required>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="username" placeholder="Enter last name" value={lastName} disabled={loggedin} />
                                <Form.Text className="error-text"> {lnerror} </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onBlur={handleEmail} onChange={(e) => {
                                setemail(e.target.value);
                            }} >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} disabled={loggedin} required />
                                <Form.Text className="error-text"> {emerror} </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword" onBlur={validatePassword} >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} disabled={loggedin} required />
                                <Form.Text className="error-text"> {passwordError} </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword1" onBlur={validateRetypePassword} >
                                <Form.Label>Retype Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={retypepassword} onChange={handleRetypePassword} disabled={loggedin || password.length == 0} required />
                                <Form.Text className="error-text"> {retypepasswordError} </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Import profile picture</Form.Label>
                                <Form.Control type="file" onChange={handleProfilePicture} size="sm" />
                            </Form.Group>
                        </Form>
                    </div>

                </Carousel.Item>

                <Carousel.Item>
                    <div className="form-container">
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your address</Form.Label>
                                <Form.Control as="textarea" rows={2} cols={50} value={address} onChange={handleAddress} required />
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group className="mb-3" controlId="formBasicTagLine">
                                <Form.Label>Tag Line</Form.Label>
                                <Form.Control placeholder="Enter your tag line" value={tagLine} onChange={handleTagLine} />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Write something cool about yourself</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescription} />
                        </Form.Group>
                        <div>
                            Where are you located?

                            <CustomDropdown datalist={location} title="choose location"
                                selectedItem={selectedLocation} multiple={false} handleChange={handleLocationChange} required />
                        </div>

                        <div>
                            Years of experience?

                            <CustomDropdown datalist={years} title="choose your experience"
                                selectedItem={experience} multiple={false} handleChange={handleExpChange} />
                        </div>

                        <div>
                            Preferrable days of work
                            <CustomDropdown datalist={days} title="pick availability" multiple={true}
                                selectedItem={day} handleChange={handleDayChange} />
                        </div>

                        <div>
                            Choose your domain
                            <CustomDropdown title={"domain"} multiple={true}
                                selectedItem={selectedDomain} datalist={domains} handleChange={handleDomainChange} />
                        </div>

                        <div>
                            Add skills
                            <CustomDropdown title={"skills"} multiple={true}
                                selectedItem={selectedSkill} datalist={skills} handleChange={handleSkillChange} />
                        </div>

                        <div>
                            Wage per hour
                            <Slider
                                className={classes.root}
                                defaultValue={wage}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                min={10}
                                max={90}
                                marks
                            />
                        </div>

                    </div>
                    <div className="mt-4">
                        <center>
                            <CustomButton variant={'outlineButton'} text={"Set me up"} clickFn={handleJoin} />
                        </center>
                    </div>
                </Carousel.Item>
            </Carousel>




        </div>
    )
}
