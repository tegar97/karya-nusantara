import React, { useState, createContext } from "react";

export const CategoryProductContext = createContext(null);

export const CategoryProductProvider = (props) => {
  const [categoryId, setCategoryId] = useState(0);

  return (
    <CategoryProductContext.Provider value={[categoryId, setCategoryId]}>
      {props.children}
    </CategoryProductContext.Provider>
  );
};
