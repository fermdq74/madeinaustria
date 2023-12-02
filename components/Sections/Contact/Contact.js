import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import styles from "./styles.module.scss";

const Contact = (props) => {

    const lp = useLangContext(LangContextProvider);

    return (
        <div className={`container ${styles.contact}`}>
            {
                props.contact.map((contact) => (
                    <div className={`col-4 ${styles.cCol}`}>
                        <div>
                        <h5>{lp.languaje == 'es' ? contact.country_es : contact.country_en}</h5>
                        {
                            contact.contact_info.map((ci) => (
                                <p>{ci.children[0].text}</p>
                            ))
                        }
                        </div>
                        <div className={styles.separator}></div>
                    </div>
                ))
            }
            
        </div>
    );

};

export default Contact;