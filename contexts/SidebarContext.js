"use client"
import React, { createContext, useContext, useState } from 'react';

export const SidebarContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarContextProvider = ({ children }) => {
  const [sidebarVisibility, setSidebarVisibility] = useState(true);
  const [usersVisibility, setUsersVisibility] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <SidebarContext.Provider value={{ selectedUser, setSelectedUser, sidebarVisibility, setSidebarVisibility, usersVisibility, setUsersVisibility, userList, setUserList }}>
      {children}
    </SidebarContext.Provider>
  );
};