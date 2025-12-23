
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Search from './screens/Search';
import Details from './screens/Details';
import AddItem from './screens/AddItem';
import CreateOrder from './screens/CreateOrder';
import CompleteOrder from './screens/CompleteOrder';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl relative">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/create" element={<CreateOrder />} />
          <Route path="/complete/:id" element={<CompleteOrder />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
