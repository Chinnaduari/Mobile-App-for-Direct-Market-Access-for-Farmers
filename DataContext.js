// DataContext.js
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [farmerDetails, setFarmerDetails] = useState([]);

  return (
    <DataContext.Provider value={{ farmerDetails, setFarmerDetails }}>
      {children}
    </DataContext.Provider>
  );
};
