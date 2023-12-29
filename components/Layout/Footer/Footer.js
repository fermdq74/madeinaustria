import Image from "next/image";
import Link from "next/link";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import styles from "./styles.module.scss";
import LanguajeSelector from "../../Sections/LanguageSelector/LanguajeSelector";

const Footer = (props) => {

    const lp = useLangContext(LangContextProvider);

    const openAbout = () => {
        props.setAboutState(true);
    }

    return (
        <div className={`container ${styles.footer}`}>
            <div className={styles.fcw}>
                <div className={styles.logo}>
                    <Link href="/">
                        <img src={props.logo} alt="logo image" />
                    </Link>
                </div>

                <div className={styles.footerNav}>
                    {
                        props.menu.map((item, idx) => (
                            item.slug == "about" ?
                                <a 
                                    onClick={openAbout} 
                                    className={styles.aboutButton}
                                >
                                    {lp.languaje == 'es' ? item.menu_item : item.menu_item_en}
                                </a>
                            :
                                <Link 
                                    href={item.slug}
                                    key={idx}
                                >
                                    <a>
                                        {lp.languaje == 'es' ? item.menu_item : item.menu_item_en}
                                    </a>
                                </Link>
                        ))
                    }
                    <LanguajeSelector 
                        tc={"white"} 
                        from={"footer"} 
                    />
                </div>
            </div>
        </div>
    );

};

export default Footer;