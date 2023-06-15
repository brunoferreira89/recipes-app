import React from 'react';
import HeaderProvider from './context/Providers/HeaderProvider';
import SearchProvider from './context/Providers/SearchProvider';
import RouterSwitch from './Router';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <HeaderProvider>
      <SearchProvider>
        <Header />
        <RouterSwitch />
        <Footer />
      </SearchProvider>
    </HeaderProvider>
  );
}

export default App;
