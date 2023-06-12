import React from 'react';
import HeaderProvider from './context/Providers/HeaderProvider';
import SearchProvider from './context/Providers/SearchProvider';
import RouterSwitch from './Router';

function App() {
  return (
    <HeaderProvider>
      <SearchProvider>
        <RouterSwitch />
      </SearchProvider>
    </HeaderProvider>
  );
}

export default App;
