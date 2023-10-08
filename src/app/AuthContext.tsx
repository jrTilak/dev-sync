"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import axios from "axios";
const Context = createContext<AuthContextType | undefined>(undefined);

type AuthContextType = {
  currentUser: any;
  isUserLoggedIn: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAuthContext = () => {
  const context = use(Context);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
const auth = getAuth(app);
export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({} as any);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as any);
      if (user) {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  if (isUserLoggedIn) {
    let config = {
      method: "get",
      url: "https://dev-sync-khaki.vercel.app//api/users",
      headers: {
        uid: currentUser.uid,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setCurrentUser((prev: any) => ({ ...prev, ...response.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
