import Image from "next/image";
import Link from "next/link";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import styles from "./styles.module.scss";
import LanguajeSelector from "../../Sections/LanguageSelector/LanguajeSelector";

const Footer = (props) => {

    const lp = useLangContext(LangContextProvider);

    return (
        <div className={`container ${styles.footer}`}>
            <div className={styles.fcw}>
                <div className={styles.logo}>
                        <Image 
                            src={props.logo}
                            width={88}
                            height={54}
                            alt="Logo image"
                        />
                </div>

                <div className={styles.footerNav}>
                    {
                        props.menu.map((item) => (
                            <Link href={item.slug}>
                                {lp.languaje == 'es' ? item.menu_item : item.menu_item_en}
                            </Link>
                        ))
                    }
                    <LanguajeSelector tc={"white"} from={"footer"}></LanguajeSelector>
                </div>
            </div>
        </div>
    );

};

export default Footer;