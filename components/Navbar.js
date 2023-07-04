import Link from "next/link";
//import Image from "next/image";
import React, { useState } from "react";
//import Logo from "./Logo";
import NavItem from "./NavItem";
import { staticRequest } from "tinacms";

import { tinaField, useTina } from "tinacms/dist/react";
import { client } from '../tina/__generated__/client';

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "About Us", href: "/about" },
  { text: "Contact", href: "/contact" },
];

//const mySettings = await client.queries.global_settings({ relativePath: 'global-settings.md' })
//console.log(mySettings.name);

const Navbar = async (props) => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const myPost = await client.queries.global_settings({ relativePath: 'global-settings.md' })

  console.log(myPost.data);

  return (
    <header>
      <nav className={`nav`}>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

export const getStaticProps = async () => {
  const { name } = await client.queries.global_settings({
    relativePath: "global-settings.md",
  });

  return {
      name,
      //myOtherProp: 'some-other-data',
  };
};