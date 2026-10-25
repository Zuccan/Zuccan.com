import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [currentPortal, setCurrentPortal] = useState('parent');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith('/customers')) {
      setCurrentPortal('customers');
    } else if (location.pathname.startsWith('/business')) {
      setCurrentPortal('business');
    } else {
      setCurrentPortal('parent');
    }
    // Close mobile drawer on route change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <NavigationContext.Provider
      value={{
        currentPortal,
        setCurrentPortal,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
