import React from "react";
import { useUserContext } from "../context/userContext";
import { useRef, useState, useEffect } from "react";
import but from '../assets/edit-button.png'

import './Homepage.css'

const Homepage = () => {


    const nameRef = useRef();

    const [imageAsFile, setImageAsFile] = useState('')
    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(image)
    }

    const { user, logoutUser, updatename, updatephoto } = useUserContext();


    const [name, setName] = useState(user.displayName);


    const updateName = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        if (name) updatename(name);
    };

    const updatePhoto = (e) => {
        e.preventDefault();
        if (imageAsFile) {
            updatephoto(imageAsFile)
        };
    };

    const namechangeHandler = (event) => {
        setName(event.target.value);
    };

    return (
        <>

            <button onClick={logoutUser} className="logout">Log out</button>
        
            <h1>Homepage </h1>
            <div className="flexy">
            
                <div>
                    <img src={user.photoURL}></img>
                    <form onSubmit={updatePhoto}>
                    <label for="upload-photo"><img src={but} className="label-img"/></label>
                        <input
                            type='file'
                            onChange={handleImageAsFile}
                            id = "upload-photo"
                        />
                        <button type='submit'>Change</button>
                    </form>
                </div>
                <div className="right-part">
                    <h2>Name: {name}</h2>
                    <h2>Email: {user.email}</h2>
                    <form onSubmit={updateName}>
                        <input
                            type='text'
                            value={name}
                            placeholder="Enter the name here"
                            onChange={namechangeHandler}
                            ref={nameRef}
                        />
                        <button type='submit'>Change</button>
                    </form>
                    
                </div>
            </div>
            
        </>
    )
}


export default Homepage