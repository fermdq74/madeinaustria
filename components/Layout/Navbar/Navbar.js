import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import LanguageSelector from "../../Sections/LanguageSelector/LanguajeSelector";

import styles from "./styles.module.scss";

const Navbar = (props) => {

  const np = useNavContext(NavContextProvider);
  
  const menuButtonRef = useRef(null);
  const mrRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    menuButtonRef.current.addEventListener("click", () => {
      menuButtonRef.current.classList.toggle(styles.open);
      navRef.current.classList.toggle(styles.hidden);
    });
  }, []);

  useEffect(() => {
    if(props.aboutState) {
      menuButtonRef.current.classList.remove(styles.open);
      navRef.current.classList.add(styles.hidden);
    }
  }, [props.aboutState]);

  const openPersonInfo = () => {
    np.setPersonDescription(true);
  }

  return (
    
    <div 
      className={`${styles.menuWrapper} ${styles.transparent} ${np.navStatus ? styles.showNav : styles.hiddenNav} ${np.videoOpen ? styles.videoOpen : null }`}
      ref={mrRef}
    >

      <div className={styles.overlay} />

      <div className={styles.siteLocation}>
        {`${np.siteLocation}`}
        {
          np.subpageLocation != '' ? 
            <>
              <div className={styles.separator} />
              <button 
                className={`${styles.navPerson} ${np.personDescription ? styles.dOpen : null}`}
                onClick={openPersonInfo}
              >
                {np.subpageLocation}
              </button>
            </>
          : 
            null
        }
      </div>

      <div className={styles.logo}>
        <Link href="/">
          <img src={props.logo} alt="logo image" />
        </Link>
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
                <NavItem 
                  key={idx} 
                  menuItem={menu}
                  setAboutState={props.setAboutState} 
                />
            ))}
          </div>
          <LanguageSelector 
            tc={"white"} 
            from={"nav"}
          />
        </div>
      </nav>
        
    </div>
    
  );
};

export default Navbar;