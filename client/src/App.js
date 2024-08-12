import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Defaultcomponent from './compoment/Defaultcompoment/Defaultcompoment'; // Corrected import path
import { HomeProvider } from './store/HomeContext';
import { routes } from './routers/index';

function App() {
  return (
    <div className="App" style={{backgroundColor:'black'}}>
      <Router>
      <HomeProvider>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? Defaultcomponent : Fragment;

            return (
              <Route key={route.path} path={route.path} element={<Layout><Page /></Layout>} />
            );
          })}
        </Routes>
        </HomeProvider>
      </Router>
    </div>
  );
}

export default App;
