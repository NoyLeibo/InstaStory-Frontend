import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActiveIconContextType = {
    activeIcon: string;
    setActiveIcon: React.Dispatch<React.SetStateAction<string>>; // Adjusted type here
};

const defaultState: ActiveIconContextType = {
    activeIcon: 'Home',
    setActiveIcon: () => { }, // This will be overridden by the actual useState hook
};

const ActiveIconContext = createContext<ActiveIconContextType>(defaultState);

export const useActiveIcon = () => useContext(ActiveIconContext);

type ActiveIconProviderProps = {
    children: ReactNode;
};

export const ActiveIconProvider: React.FC<ActiveIconProviderProps> = ({ children }) => {
    const [activeIcon, setActiveIcon] = useState<string>('Home');

    return (
        <ActiveIconContext.Provider value={{ activeIcon, setActiveIcon }}>
            {children}
        </ActiveIconContext.Provider>
    );
};
