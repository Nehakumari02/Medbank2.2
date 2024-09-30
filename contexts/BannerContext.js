import React, { createContext, useContext, useState, useCallback } from "react";

const BannerContext = createContext();

export const useBanner = () => {
    return useContext(BannerContext);
};

export const BannerProvider = ({ children }) => {
    const [banner, setBanner] = useState({ visible: false, text: "" });

    const showBanner = useCallback((text) => {
        setBanner({ visible: true, text });
    }, []);

    const hideBanner = useCallback(() => {
        setBanner({ visible: false, text: "" });
    }, []);

    return (
        <BannerContext.Provider value={{ banner, showBanner, hideBanner }}>
            {children}
        </BannerContext.Provider>
    );
};
