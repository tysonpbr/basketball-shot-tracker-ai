import React, { useState } from 'react'
import { CameraPage, HomePage, AccountPage, SettingsPage } from './pages'
import { NavBar } from './components'

const App = () => {
  const [location, setLocation] = useState('Home');

  const renderPage = () => {
    switch (location) {
      case 'Home':
        return <HomePage />;
      case 'Camera':
        return <CameraPage />;
      case 'Account':
        return <AccountPage />;
      case 'Settings':
        return <SettingsPage />;
    }
  };

  return (
    <div className='w-screen h-screen bg-white text-black'>
      <NavBar location={location} setLocation={setLocation} />
      {renderPage()}
    </div>
  )
}

export default App