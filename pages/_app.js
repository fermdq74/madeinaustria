import React from 'react';
import '../styles.css';
import LangContextProvider from '../context/LangContextProvider';

const App = ({ Component, pageProps }) => {
  return (
    <LangContextProvider>
      <Component {...pageProps} />
    </LangContextProvider>
  );
};

export default App;
