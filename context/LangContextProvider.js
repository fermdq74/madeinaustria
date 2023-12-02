import { createContext, useState, useContext } from "react";

const LangContext = createContext({});

const LangContextProvider = ({children}) => {

    const [languaje, setLanguaje] = useState('es');

    return (
        <LangContext.Provider value={{languaje, setLanguaje}}>
            {children}
        </LangContext.Provider>
    )
}

export default LangContextProvider;

export const useLangContext = () => {
    return useContext(LangContext);
}