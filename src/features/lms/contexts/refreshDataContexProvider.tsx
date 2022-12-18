import {ReactNode, useState, useEffect, createContext, useContext} from 'react';

type RefreshContextType = {
    refreshData: boolean;
    toggleRefreshData: () => void;
}

interface Props {
    children: ReactNode;
}


const RefreshContext = createContext<RefreshContextType | null>(null);

export const RefreshContextProvider = ({children}: Props) => {
    const [refreshData, setRefreshData] = useState(false);
  

    const toggleRefreshData = () => {
       setRefreshData((prev) => !prev);
    }
    
    useEffect(() => {
        toggleRefreshData 
    }, []);

    return (
        <RefreshContext.Provider value = {{refreshData, toggleRefreshData}}>
            {children}
        </RefreshContext.Provider>
    );
}


export const useRefreshContext = () => {
    const context = useContext(RefreshContext);
    if (!context)
        throw new Error('AuthContext must be used with AuthContextProvider!');
    return context;
};