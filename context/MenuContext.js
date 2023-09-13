"use client";

import { createContext, useCallback, useState } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = useCallback(() => {
    setIsOpen((prev) => (!prev));
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  
    return (
      <MenuContext.Provider value={{ toggle, closeMenu, isOpen }}>
        {children}
      </MenuContext.Provider>
    );
  };