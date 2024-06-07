import { useState } from 'react';

import Head from 'next/head';
import Navbar from './Navbar/Navbar';
import About from '../Sections/About/About';
import Contact from '../Sections/Contact/Contact';
import Footer from './Footer/Footer';

export const Layout = (props) => {

  const [aboutState, setAboutState] = useState(null);

  console.log("MENU: ", props.menu);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div id="current-lang" data-value="en"></div>
        <Navbar 
          logo={props.logo} 
          menu_items={props.menu} 
          aboutState={aboutState}
          setAboutState={setAboutState}
        />
      </header>

      <main>{props.children}</main>

      <Contact contact={props.contact} />
      {
        aboutState ? 
          <About 
            about_data={props.about_data} 
            setAboutState={setAboutState} 
          />
        :
          null
      }
      <Footer 
        logo={props.logo} 
        menu={props.menu} 
        aboutState={aboutState}
        setAboutState={setAboutState}
      />

    </div>
  )
}
