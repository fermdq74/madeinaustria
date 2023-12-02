import Head from 'next/head';
import Navbar from './Navbar/Navbar';
import Contact from '../Sections/Contact/Contact';
import Footer from './Footer/Footer';

export const Layout = (props) => {

  console.log("LAYOUT PROPS: ", props);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div id="current-lang" data-value="en"></div>
        <Navbar logo={props.logo} menu_items={props.menu} />
      </header>

      <main>{props.children}</main>

      <Contact contact={props.contact} />
      <Footer logo={props.logo} menu={props.menu} />

    </div>
  )
}
