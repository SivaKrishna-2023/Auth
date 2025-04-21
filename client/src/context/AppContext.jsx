// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
export const AppContext = createContext();

// Context Provider
export const AppContextProvider = ({ children }) => {

    axios.defaults.withCredentials = true;
    
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  const getAuthState = async () =>{
    try{
        const {data} = await axios.get(backendUrl + "/api/auth/is-auth")
        if(data.success){
            setIsLoggedin(true)
            getUserData()
        }

    }
    catch(error){
        toast.error(error.message)
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      console.log(data)
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch user data");
    }
  };

  useEffect(()=>{
    getAuthState()
  },[])

  const contextValue = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
