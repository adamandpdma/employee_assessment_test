import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import ResponsiveDrawerAdmin from './AdminComponents/crudTest/ResponsiveDrawerAdmin';
import ResponsiveDrawerEmployee from './EmployeeComponents/ResponsiveDrawerEmployee';

function App() {
  return (
    <div>
          <BrowserRouter> 
      <ResponsiveDrawerEmployee/> 
     {/* <ResponsiveDrawerAdmin/> */}
     </BrowserRouter>
    </div>
  );
}

export default App;
