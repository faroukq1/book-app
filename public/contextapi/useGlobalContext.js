import React, { createContext, useState, useContext, useEffect } from "react";
import { customFetch } from "../util/customFetch";

// Create a context
const GlobalContext = createContext();

// Provider component
export const GlobalProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch("/api/books");
        setBooks(response.data.data);
      } catch (error) {
        console.log("Error fetching books:", error.message);
      }
    };

    fetchData();
  }, [refresh]);

  const triggerRefresh = () => {
    setRefresh(new Map());
  };
  return (
    <GlobalContext.Provider value={{ books, setBooks, triggerRefresh }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
