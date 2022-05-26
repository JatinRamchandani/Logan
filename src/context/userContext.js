import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"

import { storage } from "../firebase";
import { auth } from "../firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const UserContext = createContext({})

export const useUserContext = () => {
    return useContext(UserContext);
};


export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");


    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, res => {
            res ? setUser(res) : setUser(null);
            setError("")
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const registerUser = (email, name, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: "https://upload.wikimedia.org/wikipedia/en/c/c2/Peter_Griffin.png"
                });
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));

    }

    const signInUser = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => console.log(res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    const logoutUser = () => {
        signOut(auth);
    }


    const updatename = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    

    const updatephoto = (photo) => {

        console.log(photo);
        const storageRef = ref(storage, `/images/${photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error) => {
                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    })
                });
            }
        )
        
    }

    const contextValue = {
        user,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        updatename,
        updatephoto
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}