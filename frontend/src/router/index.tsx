import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CarsPage from '../pages/CarsPage';
import CarRegister from '../pages/CarRegister';
import CarEdit from '../pages/CarEdit';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="/cars" replace />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/register" element={<CarRegister />} />
      <Route path="/cars/edit/:id" element={<CarEdit />} />
    </Routes>
  );
};

export default AppRouter;