import React from 'react'
import './App.css'
import NavRoutes from './components/navigation/NavRoutes';
import { AuthProvider } from './components/assets/context/AuthContext';
import { DataProvider } from './components/assets/context/DataContext';

const App = () => {

  return (
    <>
    <AuthProvider>
      <DataProvider>
        <NavRoutes/>
      </DataProvider>  
    </AuthProvider>
    </>
  )
}

export default App
