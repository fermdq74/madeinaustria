import { createContext, useState, useContext } from "react";

const NavContext = createContext({});

const NavContextProvider = ({children}) => {

    const [siteLocation, setSiteLocation] = useState('');
    const [subpageLocation, setSubpageLocation] = useState('');
    const [navStatus, setNavStatus] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);

    return (
        <NavContext.Provider value={{
            siteLocation, 
            setSiteLocation, 
            subpageLocation, 
            setSubpageLocation,
            navStatus,
            setNavStatus,
            videoOpen,
            setVideoOpen
        }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContextProvider;

export const useNavContext = () => {
    return useContext(NavContext);
}