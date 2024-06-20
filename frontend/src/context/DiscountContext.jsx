import React, { createContext, useState, useContext,useEffect } from 'react';

const DiscountContext = createContext();

export const useDiscount = () => useContext(DiscountContext);

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Fetch discounts from your backend
    fetch(`https://ecommerceapi-2-6l87.onrender.com/api/v1/discounts`)
        .then(response => response.json())
      .then(data => setDiscounts(data))
      .catch(error => console.error('Error fetching discounts:', error));
  }, []);



  return (
    <DiscountContext.Provider value={{ discounts, setDiscounts }}>
      {children}
    </DiscountContext.Provider>
  );
};
