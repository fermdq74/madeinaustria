import Link from "next/link";
import styles from "./styles.module.scss";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";

const NavItem = (props) => {

  const lp = useLangContext(LangContextProvider);

  return (
    
    props.menuItem.children ?
      <div className={styles.subItemsWrapper}>
        <h5>{lp.languaje == 'es' ? props.menuItem.menu_item : props.menuItem.menu_item_en}</h5>
        {
          props.menuItem.children.map((subItem) => (
            <Link href={subItem.slug}>
              {lp.languaje == 'es' ? subItem.menu_item : subItem.menu_item_en}
            </Link>
          ))
        }
      </div>
    :
      <Link href={props.menuItem.slug}>
        {lp.languaje == 'es' ? props.menuItem.menu_item : props.menuItem.menu_item_en}
      </Link>
     
  );

};

export default NavItem;