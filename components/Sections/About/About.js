import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";


const About = (props) => {

    const closeRef = useRef(null);
    const lp = useLangContext(LangContextProvider);

    const closeAbout = () => {
        props.setAboutState(false);
    }

    return (
        <section className={styles.about}>
            
            <div className={styles.aboutNav}>
                <div className={styles.siteLocation}>
                    {lp.languaje == 'es' ? 'nosotros' : 'about'}
                </div>

                <div className={styles.logo}>
                    <Link href="/">
                        <img 
                            src={props.about_data.about_logo} 
                            alt="logo image" 
                        />
                    </Link>
                </div>

                <button 
                    className={styles.closeButton}
                    onClick={closeAbout}
                />
            </div>

            <div className={styles.aboutContent}>
                {lp.languaje == 'es' ? 
                    props.about_data.description_es.children.map((description, idx) => (
                        <p key={idx}>{description.children[0].text}</p>
                    ))
                : 
                    props.about_data.description_en.children.map((description, idx) => (
                        <p key={idx}>{description.children[0].text}</p>
                    ))
                }
            </div>

        </section>
    );
};

export default About;