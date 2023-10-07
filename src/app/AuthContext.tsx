"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import axios from "axios";
const Context = createContext();

export const useAuthContext = () => {
  const context = use(Context);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
const auth = getAuth(app);
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  let config = {
    method: "get",
    url: "http://localhost:3000/api/users",
    headers: {
      uid: currentUser.uid,
    },
  };

  axios
    .request(config)
    .then((response) => {
      setCurrentUser((prev) => ({ ...prev, ...response.data }));
    })
    .catch((error) => {
      console.log(error);
    });

  const authContextValue = {
    currentUser,
    isUserLoggedIn,
    setCurrentUser,
    setIsUserLoggedIn,
  };

  return (
    <Context.Provider value={authContextValue}>{children}</Context.Provider>
  );
};
