import { createContext, useContext, useState, useEffect } from 'react';

type SubscriptionLevel = 'free' | 'starter' | 'pro' | 'mastermind';

interface SubscriptionContextType {
    subscriptionLevel: SubscriptionLevel;
    setSubscriptionLevel: (level: SubscriptionLevel) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscriptionLevel, setSubscriptionLevel] = useState<SubscriptionLevel>('free');

    useEffect(() => {
        const fetchSubscription = async () => {
            const response = await fetch('/api/subscription');
            const data = await response.json();
            if (data.subscriptionLevel) {
                setSubscriptionLevel(data.subscriptionLevel);
            }
        };

        fetchSubscription();
    }, []);

    return (
        <SubscriptionContext.Provider value={{ subscriptionLevel, setSubscriptionLevel }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};
