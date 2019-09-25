import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import ResponsiveDrawer from './AdminComponents/crudTest/ResponsiveDrawer';
import ResponsiveDrawerEmployee from './EmployeeComponents/ResponsiveDrawerEmployee';

function App() {
  return (
    <div>
          <BrowserRouter> 
      <ResponsiveDrawerEmployee/> 
     {/* <ResponsiveDrawer/> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
