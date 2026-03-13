import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/index.js';
import PrivateRoute from './PrivateRoute';

import LoginPage        from '../pages/auth/LoginPage';
import RegisterPage     from '../pages/auth/RegisterPage';
import DashboardPage    from '../pages/dashboard/DashboardPage';
import VehiclesPage     from '../pages/vehicles/VehiclesPage';
import VehicleDetailPage from '../pages/vehicles/VehicleDetailPage';
import ChatPage         from '../pages/chat/ChatPage';
import NotFoundPage     from '../pages/NotFoundPage';

const P = ({ children }) => <PrivateRoute>{children}</PrivateRoute>;

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME}           element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      <Route path={ROUTES.LOGIN}          element={<LoginPage />} />
      <Route path={ROUTES.REGISTER}       element={<RegisterPage />} />
      <Route path={ROUTES.DASHBOARD}      element={<P><DashboardPage /></P>} />
      <Route path={ROUTES.VEHICLES}       element={<P><VehiclesPage /></P>} />
      <Route path={ROUTES.VEHICLE_DETAIL} element={<P><VehicleDetailPage /></P>} />
      <Route path={ROUTES.CHAT}           element={<P><ChatPage /></P>} />
      <Route path={ROUTES.NOT_FOUND}      element={<NotFoundPage />} />
    </Routes>
  );
}