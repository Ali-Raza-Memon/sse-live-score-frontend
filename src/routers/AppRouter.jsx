import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../components/Admin';
import Client from '../components/Client';


const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/admin" element={ <Admin/> } />
          <Route path="/client" element={ <Client /> } />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;