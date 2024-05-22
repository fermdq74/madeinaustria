import Link from "next/link";
import styles from "./styles.module.scss";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";

const NavItem = (props) => {

  const lp = useLangContext(LangContextProvider);

  const openAbout = () => {
    props.setAboutState(true);
  }

  console.log("MENUITEMS: ", props.menuItem);

  return (
    
    props.menuItem.children ?
      <div className={styles.subItemsWrapper}>
        <Link href={`/${props.menuItem.slug}`}>
          <a 
            className={styles.listLink}
          >
            {lp.languaje == 'es' ? props.menuItem.menu_item : props.menuItem.menu_item_en}
          </a>
        </Link>
        {
          props.menuItem.children.map((subItem, idx) => (
            <Link 
              href={`/${props.menuItem.slug == "directors" ? "directors/" + subItem.slug.replace(/-/g, "_") : "photographers/" + subItem.slug.replace(/-/g, "_")}`}
              key={idx}
            >
              <a>
                {lp.languaje == 'es' ? subItem.menu_item : subItem.menu_item_en}
              </a>
            </Link>
          ))
        }
      </div>
    :
      props.menuItem.slug == "about" ?
        <a 
          onClick={openAbout} 
          className={styles.aboutButton}
        >
          {lp.languaje == 'es' ? props.menuItem.menu_item : props.menuItem.menu_item_en}
        </a>
      :
      <Link href={`/${props.menuItem.slug}`}>
        <a>
          {lp.languaje == 'es' ? props.menuItem.menu_item : props.menuItem.menu_item_en}
        </a>
      </Link>
     
  );

};

export default NavItem;