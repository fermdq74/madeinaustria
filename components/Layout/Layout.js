import Link from 'next/link';
import Head from 'next/head';
import Navbar from './Navbar';

export const Layout = (props) => {

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

    </div>
  )
}
