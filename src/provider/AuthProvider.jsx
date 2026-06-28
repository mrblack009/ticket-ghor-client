
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../firebase/fiirebase.config";
import AuthContext from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [actionloading, setActionLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        setActionLoading(true);
        const result =  createUserWithEmailAndPassword(auth, email, password);
        setActionLoading(false);
        return result;
    }

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }

     const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);
        })
        return () => {
            unSubscribe();
        }
    }, [])
  const userInfo = {
    createUser,
    updateUser,
    signUser,
    logOut,
    googleLogin,
    user,
    loading,
    actionloading,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};
export default AuthProvider;
