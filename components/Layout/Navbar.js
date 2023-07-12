import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import NavItem from "./NavItem";

const Navbar = (props) => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <div className="menu-wrapper">
        <header>
            <div className="logo">
                <Image 
                    src={props.logo}
                    width={80}
                    height={50}
                    alt="Logo image"
                />
            </div>
            <nav className={`nav`}>
                <div className={`${navActive ? "active" : ""} nav_menu-list`}>
                {props.menu_items.map((menu, idx) => (
                    <NavItem key={idx} text={menu.menu_item} slug={menu.slug} />
                ))}
                </div>
            </nav>
        </header>
    </div>
  );
};

export default Navbar;