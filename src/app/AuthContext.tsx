"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
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
      console.log("user", user);

      setCurrentUser(user || {});
      if (user) {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

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
