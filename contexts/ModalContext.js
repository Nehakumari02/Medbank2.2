import React, { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({ visible: false, title: "", body: "" });

    const showModal = useCallback((title, body) => {
        setModal({ visible: true, title, body });
    }, []);

    const hideModal = useCallback(() => {
        setModal({ visible: false, title: "", body: "" });
    }, []);

    return (
        <ModalContext.Provider value={{ modal, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    );
};
