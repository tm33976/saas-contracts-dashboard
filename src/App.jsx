import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContractDetailPage from './pages/ContractDetailPage';
import ComingSoonPage from './pages/ComingSoonPage';

function App() {
  return (
    <Routes>
      {/* The main pages are now public for your review */}
      <Route path="/" element={<DashboardPage />} />
      <Route path="/contract/:contractId" element={<ContractDetailPage />} />
      
      {/* Add routes for the placeholder pages */}
      <Route path="/insights" element={<ComingSoonPage />} />
      <Route path="/reports" element={<ComingSoonPage />} />
      <Route path="/settings" element={<ComingSoonPage />} />

      {/* The login page is available at its own URL */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;