import React, { createContext, useContext, useState } from 'react';

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 800, y: 400 });
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const updateUserPosition = (p) => setPosition(p);
  const updateScreenSize = (s) => setScreenSize(s);

  return (
    <UserInfoContext.Provider
      value={{
        position,
        screenSize,
        updateUserPosition,
        updateScreenSize,
      }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
