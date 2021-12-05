import React, { useEffect, useRef, useState } from 'react';
import './Seek.scss';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import shortid from 'shortid';
import SkillList from './SkillList';
import { makeStyles } from '@material-ui/styles';
import { Form } from 'react-bootstrap';
import CustomDropdown from '../utilities/customs/CustomDropdown/CustomDropdown';
import CustomButton from '../utilities/customs/CustomButton/CustomButton';

const useStyles = makeStyles({
    root: {
        width: 200
    }
})


const Seek = (props) => {

    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [domains, setDomains] = useState([]);
    const [skills, setSkills] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    // const id = useParams();
    // const location = useLocation();
    let { state } = useLocation();
    console.log(state, " !!");
    let { skillChosen } = state;
    let seekerLoc = '';
    // const skill = state.skillSelected;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seekerlocation, setSeekerlocation] = useState('');

    // const places = ['San Fransico', 'Boston', 'Los Angeles']

    useEffect(() => {
        const fetchUsers = async () => {
            const req = { "skill": skillChosen };
            setSelectedSkill(skillChosen);
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            };
            const result = await fetch('http://localhost:4000/seek', postOptions).then(response => response.json());
            setUsers(result.data);
            setLoading(false);
        }
        fetchUsers();
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
        const fetchLocations = async () => {
            const postOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const result = await fetch('http://localhost:4000/locations', postOptions).then(response => response.json());
            console.log( result.data[0].places);
            let places = [];
            result.data[0].places.map((place) => {
                places.push(place);
            })
            setLocations(places);
            setLoading(false);
        }
        fetchLocations();
    }, []);


    const handleMinPrice = (e) => {
        setMinPrice(e.target.value);
    }

    const handleMaxPrice = (e) => {
        setMaxPrice(e.target.value);
    }

    const handleLocationChange = (e) => {
        setSeekerlocation(e.target.value);
        seekerLoc = e.target.value;
    }

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

    const handleSkillChange = (e) => {
        skillChosen = (e.target.value);
        setSelectedSkill(e.target.value)
    }

    const handleSubmit = async () => {
        console.log("check1 " + maxPrice)
        let filter = {
            ...(minPrice != "" && { min: minPrice }),
            ...(maxPrice != "" && { max: maxPrice }),
            ...(seekerlocation != "" && { seekLoc: seekerlocation }),
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

    console.log("MINN MAX ", minPrice, maxPrice);
    return (
        <>
            <div className="seek-container">
                <div className="seek-container-price">
                    <Form.Group className="mb-3" className={classes.root} controlId="formBasicUsername" onChange={handleMinPrice} >
                        <Form.Label>Min Price</Form.Label>
                        <Form.Control type="username" placeholder="10" value={minPrice} />
                    </Form.Group>
                    <Form.Group className="mb-3" className={classes.root} controlId="formBasicUsername" onChange={handleMaxPrice} >
                        <Form.Label>Max Price</Form.Label>
                        <Form.Control type="username" placeholder="100" value={maxPrice} />
                    </Form.Group>

                    <CustomDropdown datalist={locations} title="choose location"
                        selectedItem={seekerlocation} multiple={false} handleChange={handleLocationChange} />
                    <CustomButton variant={'darkButton'} clickFn={handleSubmit} text="Filter" />
                </div>

            </div>
            <div className="seek-filter-container">
                <div>
                    <CustomDropdown datalist={domains} title="Choose a Domain"
                        selectedItem={selectedDomain} multiple={false} handleChange={handleDomainChange} />
                    <CustomDropdown datalist={skills} 
                        selectedItem={selectedSkill} multiple={false} handleChange={handleSkillChange} />
                    <CustomButton variant={'darkButton'} clickFn={handleSubmit} text="Search" />
                </div>
            </div>
            <SkillList users={users}></SkillList>

        </>
    )
    // }
    // else {
    //     return (<div className="seek-details-container">
    //         <h1>Oops......User Not Found!!!</h1>
    //     </div>)
    // }
}

export default Seek;