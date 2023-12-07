import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";

const DirectorGrid = (props) => {

    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    return (
        <section>
            {
                props.works.map((work, index) => 
                    {
                        index == 0 ?
                        <div className={styles.mainWork}>

                        </div>
                        :
                        <div className="">

                        </div>
                    }
                    
                )
            }
            
        </section>
    );

};

export default DirectorGrid;