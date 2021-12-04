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
    // const id = useParams();
    // const location = useLocation();
    let { state } = useLocation();
    console.log(state, " !!");
    // const skill = state.skillSelected;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seekerlocation, setSeekerlocation] = useState('');

    const places = ['San Fransico', 'Boston', 'Los Angeles']

    useEffect(() => {

        const { skillChosen } = state;

        const fetchUsers = async () => {
            const req = { "skill": skillChosen };
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            };
            const result = await fetch('http://localhost:4000/seek', postOptions).then(response => response.json());
            console.log(result);
            setUsers(result.data);
            setLoading(false);
        }
        fetchUsers();
    }, []);


    const handleMinPrice = (e) => {
        setMinPrice(e.target.value);
    }

    const handleMaxPrice = (e) => {
        setMaxPrice(e.target.value);
    }

    const handleLocationChange = (e) => {
        setSeekerlocation(e.target.value);

    }

    const handleSubmit = async () => {
        
        console.log("check1 " + maxPrice)
        let filter = {
            ...(minPrice != "" && { min: minPrice }),
            ...(maxPrice != "" && { max: maxPrice }),
            ...(seekerlocation != "" && { seekLoc: seekerlocation }),
            skill: 'coding'
        }
        console.log(filter);
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

    // if (!loading) {
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

                    <CustomDropdown datalist={places} title="choose location"
                        selectedItem={seekerlocation} multiple={false} handleChange={handleLocationChange} />
                    <CustomButton variant={'darkButton'} clickFn={handleSubmit} text="Filter" />
                </div>

            </div>
            {/* <SkillList users={users}></SkillList> */}

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