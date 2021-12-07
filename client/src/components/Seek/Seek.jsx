import React, { useEffect, useState } from 'react';
import './Seek.scss';
import { useLocation } from 'react-router-dom';
import SkillList from './SkillList';
import { makeStyles } from '@material-ui/styles';
import { Form } from 'react-bootstrap';
import CustomDropdown from '../utilities/customs/CustomDropdown/CustomDropdown';
import CustomButton from '../utilities/customs/CustomButton/CustomButton';
import Loader from '../utilities/Loader';

const useStyles = makeStyles({
    root: {
        width: 200
    }
})
const Seek = (props) => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [domains, setDomains] = useState([]);
    const [skills, setSkills] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    let { state } = useLocation();
    console.log(state, " !!");
    let { skillChosen } = state;
    let seekerLoc = '';
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seekerlocation, setSeekerlocation] = useState('');

    //using useEffect to fetch domains, locations and users
    useEffect(() => {
        const fetchUsers = async () => {
            //hadling all the filters here
            const req = { "skill": skillChosen };
            let filter = {
                ...((minPrice != "") ? { min: minPrice } : { min: 0 }),
                ...((maxPrice != "") ? { max: maxPrice } : { max: 100 }),
                ...((seekerlocation != "") ? { seekLoc: seekerlocation } : { seekLoc: 0 }),
                skill: skillChosen
            }
            setSelectedSkill(skillChosen);
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filter)
            };
            const result = await fetch('http://localhost:4000/seek', postOptions).then(response => response.json());
            setUsers(result.data);
            setLoading(false);
        }
        fetchUsers();
        //fetching all the domains
        const fetchDomains = async () => {
            const postOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const result = await fetch('http://localhost:4000/domains', postOptions).then(response => response.json());
            let domainNames = []
            result.map((domain) => domainNames.push(domain.name));
            setDomains(domainNames);
            setLoading(false);
        }
        fetchDomains();
        //fetching all the locations
        const fetchLocations = async () => {
            console.log("Inside locations");
            const postOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const result = await fetch('http://localhost:4000/locations', postOptions).then(response => response.json());
            console.log(result.data[0].places);
            let places = [];
            result.data[0].places.map((place) => {
                places.push(place);
            })
            setLocations(places);
            console.log(places)
            setLoading(false);
        }
        fetchLocations();
    }, []);
    //handle minPrice on change
    const handleMinPrice = (e) => {
        setMinPrice(e.target.value);
    }
    //setting Max Price on change
    const handleMaxPrice = (e) => {
        setMaxPrice(e.target.value);
    }
    //setting Location on change
    const handleLocationChange = (e) => {
        setSeekerlocation(e.target.value);
        seekerLoc = e.target.value;
    }
    //fetching all the skills in a domain when the user clicks on particular domain from the dropdown
    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value)
        const fetchSkills = async () => {
            const postOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const result = await fetch('http://localhost:4000/skills/' + e.target.value, postOptions).then(response => response.json());
            console.log(result);
            setSkills(result);
            setLoading(false);
        }
        fetchSkills();
    }
    //setting Skill on change
    const handleSkillChange = (e) => {
        skillChosen = (e.target.value);
        setSelectedSkill(e.target.value)
    }
    //Reseting all the filters by fetching all the users for the selected skill
    const handleReset = async () => {
        const req = { "skill": skillChosen };
        let filter = {
            ...((minPrice != "") ? { min: minPrice } : { min: 0 }),
            ...((maxPrice != "") ? { max: maxPrice } : { max: 100 }),
            ...((seekerlocation != "") ? { seekLoc: seekerlocation } : { seekLoc: 0 }),
            skill: skillChosen
        }
        setSelectedSkill(skillChosen);
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        };
        const result = await fetch('http://localhost:4000/seek', postOptions).then(response => response.json());
        setUsers(result.data);
        setLoading(false);
    }
    // handling submit when the user inputs values for some filters
    const handleSubmit = async () => {
        let filter = {
            ...((minPrice != "") ? { min: minPrice } : { min: 0 }),
            ...((maxPrice != "") ? { max: maxPrice } : { max: 100 }),
            ...((seekerlocation != "") ? { seekLoc: seekerlocation } : { seekLoc: '0' }),
            skill: selectedSkill
        }
        console.log(JSON.stringify(filter));
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        };
        const result = await fetch('http://localhost:4000/seek', postOptions).then(response => response.json());
        console.log(result.data);
        setUsers(result.data);
        setMinPrice('');
        setMaxPrice('');
        setSeekerlocation('');
    }
    const updateChatId = (chatId) => {
        props.setChatId(chatId)
    }
    if (!loading) {
        return (
            <>
                <div className="seek-container">
                    <div className="seek-container-price">
                        {/* Input fields for filters  */}
                        <Form.Group className="mb-3" className={classes.root} controlId="formBasicUsername" onChange={handleMinPrice} >
                            <Form.Label>Min Price</Form.Label>
                            <Form.Control type="username" placeholder="Enter Min Price" value={minPrice} />
                        </Form.Group>
                        <Form.Group className="mb-3" className={classes.root} controlId="formBasicUsername" onChange={handleMaxPrice} >
                            <Form.Label>Max Price</Form.Label>
                            <Form.Control type="username" placeholder="Enter Max Price" value={maxPrice} />
                        </Form.Group>
                        <div>
                            <CustomDropdown className='locdropdown' datalist={locations} title="choose location"
                                selectedItem={seekerlocation} multiple={false} handleChange={handleLocationChange} />
                            <CustomButton variant={'darkButton'} clickFn={handleSubmit} text="Filter" />
                            <CustomButton variant={'darkButton'} clickFn={handleReset} text="Reset Filters" />
                        </div>
                    </div>
                    <div className="seek-filter-container">
                        <div>
                            <CustomDropdown datalist={domains} title="Choose a Domain"
                                selectedItem={selectedDomain} multiple={false} handleChange={handleDomainChange} />
                            <CustomDropdown datalist={skills}
                                selectedItem={selectedSkill} multiple={false} handleChange={handleSkillChange} />
                            <CustomButton className="seachButton" variant={'darkButton'} clickFn={handleSubmit} text="Search" />
                        </div>
                    </div>
                </div>

                <SkillList selectedDomain={selectedDomain} selectedSkill={selectedSkill} updateChatId={updateChatId} userCredentials={props.userCredentials}  users={users}></SkillList>
            </>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default Seek;