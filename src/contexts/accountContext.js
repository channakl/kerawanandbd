import { createContext, useContext, useState } from 'react';
import { KSH_STATUS } from '@/helpers/constants';

const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
    const [kshStatus, setKshStatus] = useState();
    const updateKshStatus = (newState) => {
        setKshStatus(newState);
    };

    return (
        <AccountContext.Provider value={{ kshStatus, updateKshStatus }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => useContext(AccountContext);
