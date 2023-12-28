import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [newUser, setNewUser] = useState(false);

  return (
    <UserContext.Provider value={{ newUser, setNewUser }}>
      {children}
    </UserContext.Provider>
  );
};