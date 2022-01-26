import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const initialState = {
  name: "",
  imageUrl: "",
  uid: "",
};
export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(initialState);

  const value = {
    user,
    setUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const state = {
          name: user?.displayName,
          imageUrl: user?.photoURL,
          uid: user?.uid,
        };
        setUser(state);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
