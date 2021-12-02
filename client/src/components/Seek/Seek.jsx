import React, { useEffect, useRef, useState } from 'react';
import './Seek.scss';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import shortid from 'shortid';
import SkillList from './SkillList';

const Seek = (props) => {
    const [users, setUsers] = useState([]);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    // const id = useParams();
    // const location = useLocation();
    let { state } = useLocation();
    // const skill = state.skillSelected;
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [seekerlocation, setSeekerlocation] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const req = { "skill": "coding" };
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


    const handleSubmit = async () => {
        let filter = { min: minPrice, max: maxPrice, seekLoc: seekerlocation, skill: 'coding' };
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
    // if (!loading) {
    return (
        <>
            <div className="main">
                {/* <p>{state.dom} {state.skill}</p> */}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Min and Max Price</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Min Price" value={minPrice}
                        onChange={(e) => { e.preventDefault(); setMinPrice(e.target.value); }} />
                    <input type="text" className="form-control" placeholder="Max Price" value={maxPrice}
                        onChange={(e) => { e.preventDefault(); setMaxPrice(e.target.value); }} />

                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="">Location</span>
                    </div>
                    <input type="text" className="form-control" value={seekerlocation} placeholder="Location"
                        onChange={(e) => { e.preventDefault(); setSeekerlocation(e.target.value); }} />
                </div>
            </div>
            <button className="btn btn-success button" onClick={(e) => { e.preventDefault(); handleSubmit() }}> Submit </button>
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