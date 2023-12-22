import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './inputUid.scss';
import NavigationBar from './Navbar';

const GetUID = () => {
    const [uid, setUID] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
    //   console.log('Login submitted:', { uid });
        navigate(`/creditcardform/getUser/${uid}`)
    };
  
    return (
        <form onSubmit={handleSubmit}>
            {NavigationBar}
            <div className="form">
                <label>
                Phone Number:
                <input
                    type="text"
                    value={uid}
                    onChange={(e) => setUID(e.target.value)}
                />
                </label>
                <br />
                <button type="submit">View my Form</button>
            </div>
        </form>
    );
}

export default GetUID;