import { createContext, useState, useContext } from "react";

const NavContext = createContext({});

const NavContextProvider = ({children}) => {

    const [siteLocation, setSiteLocation] = useState('');
    const [subpageLocation, setSubpageLocation] = useState('');
    const [navStatus, setNavStatus] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);
    const [personDescription, setPersonDescription] = useState(false);

    return (
        <NavContext.Provider value={{
            siteLocation, 
            setSiteLocation, 
            subpageLocation, 
            setSubpageLocation,
            navStatus,
            setNavStatus,
            videoOpen,
            setVideoOpen,
            personDescription,
            setPersonDescription
        }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContextProvider;

export const useNavContext = () => {
    return useContext(NavContext);
}