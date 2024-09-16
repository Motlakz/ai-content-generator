import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
    notificationCount: number;
    setNotificationCount: (count: number | ((prevCount: number) => number)) => void; // Allow function or number
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0);

    return (
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
