import Link from 'next/link'
import Head from 'next/head'
import Navbar from '../components/Navbar';

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: '3rem',
      }}
    >
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
      <Navbar/>
      </header>
      <main>{props.children}</main>
    </div>
  )
}
