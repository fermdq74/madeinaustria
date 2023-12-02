import styles from "./styles.module.scss";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { useRef } from "react";

const LanguajeSelector = (props) => {

    const lp = useLangContext(LangContextProvider);
    const esRef = useRef(null);
    const enRef = useRef(null);

    const handleLanguajeChange = (event) => {
        if(event.target.value == "es") {
            console.log("entro es");
            esRef.current.classList.add(styles.selected);
            enRef.current.classList.remove(styles.selected);
            lp.setLanguaje('es');
        }
        if(event.target.value == "en") {
            console.log("entro en");
            enRef.current.classList.add(styles.selected);
            esRef.current.classList.remove(styles.selected);
            lp.setLanguaje('en');
        }
    }

    return (
        
            props.from == "footer" ? 

            <div className={`${styles.langSelector} ${styles.alt} ${props.tc == 'white' ? styles.white : styles.black} ${lp.languaje == 'es' && props.from != 'hero' ? styles.es : (lp.languaje == 'en' && props.from != 'hero' ? styles.en : null)}`}>
                <button 
                    onClick={handleLanguajeChange}
                    value={'es'}
                    ref={esRef}
                >
                    Esp
                </button>

                <div></div>

                <button
                    onClick={handleLanguajeChange}
                    value={'en'}
                    ref={enRef}
                >
                    Eng
                </button>
            </div>

            :

            <div className={`${styles.langSelector} ${props.tc == 'white' ? styles.white : styles.black} ${lp.languaje == 'es' && props.from != 'hero' ? styles.es : (lp.languaje == 'en' && props.from != 'hero' ? styles.en : null)}`}>
                <button 
                    onClick={handleLanguajeChange}
                    value={'es'}
                    ref={esRef}
                >
                    Español
                </button>

                <div></div>

                <button
                    onClick={handleLanguajeChange}
                    value={'en'}
                    ref={enRef}
                >
                    English
                </button>
            </div>
        
        
    );
}

export default LanguajeSelector;