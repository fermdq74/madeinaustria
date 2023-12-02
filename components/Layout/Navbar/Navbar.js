import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import LanguageSelector from "../../Sections/LanguageSelector/LanguajeSelector";

import styles from "./styles.module.scss";

const Navbar = (props) => {

  const np = useNavContext(NavContextProvider);

  //const [vo, setVO] = useState(false);
  
  const menuButtonRef = useRef(null);
  const mrRef = useRef(null);
  const navRef = useRef(null);
  const voSwitch = useRef(null);

  useEffect(() => {
    menuButtonRef.current.addEventListener("click", () => {
      menuButtonRef.current.classList.toggle(styles.open);
      navRef.current.classList.toggle(styles.hidden);
    });
    
  }, []);

  /*useEffect(() => {
    if(np.videoOpen) {
      setVO(true);
      voSwitch.current.addEventListener("click", () => {
        mrRef.current.classList.toggle(styles.videoOpen);
      });
    }else{
      setVO(false);
    }
  }, [np.videoOpen]);*/
  

  return (
    
    <div 
      className={`${styles.menuWrapper} ${styles.transparent} ${np.navStatus ? styles.showNav : styles.hiddenNav} ${np.videoOpen ? styles.videoOpen : null }`}
      ref={mrRef}
    >

            {
              /*
              np.videoOpen ?
              <div 
                className={styles.menuSwitch}
                ref={voSwitch}
              ></div>
              :
              null
              */
            }

            <div className={styles.overlay}></div>

            <div className={styles.siteLocation}>{`${np.siteLocation}`}</div>
        
            <div className={styles.logo}>
                    <Image 
                        src={props.logo}
                        width={80}
                        height={50}
                        alt="Logo image"
                    />
            </div>

            <button 
              className={styles.menuButton}
              ref={menuButtonRef}
            />

            <nav 
              className={`${styles.nav} ${styles.hidden}`}
              ref={navRef}
            >
                <div className={`${styles.navMenuList}`}>
                  <div>
                  {props.menu_items.map((menu, idx) => (
                      <NavItem key={idx} menuItem={menu} />
                  ))}
                  </div>
                  <LanguageSelector tc={"white"} from={"nav"}></LanguageSelector>
                </div>

            </nav>
        
    </div>
    
  );
};

export default Navbar;