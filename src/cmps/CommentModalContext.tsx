import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define an interface for the context value
interface CommentModalContextType {
    isCommentModalResponsive: boolean;
    setIsCommentModalResponsive: (value: boolean) => void;
}

// Create the context with an initial undefined value but specify the type
const CommentModalContext = createContext<CommentModalContextType | undefined>(undefined);

// Create a custom hook for using this context to ensure consumers are using it within a provider
export const useCommentModal = (): CommentModalContextType => {
    const context = useContext(CommentModalContext);
    if (context === undefined) {
        throw new Error('useCommentModal must be used within a CommentModalProvider');
    }
    return context;
};

// Define the props for the provider component to include children
interface CommentModalProviderProps {
    children: ReactNode;
}

// Define the provider component with typed props
export const CommentModalProvider: React.FC<CommentModalProviderProps> = ({ children }) => {
    const [isCommentModalResponsive, setIsCommentModalResponsive] = useState<boolean>(true);

    return (
        <CommentModalContext.Provider value={{ isCommentModalResponsive, setIsCommentModalResponsive }}>
            {children}
        </CommentModalContext.Provider>
    );
};
