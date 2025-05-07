import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBoard from './pages/UserBoard';
import AdminBoard from './pages/AdminBoard';
import ModeratorBoard from './pages/ModeratorBoard';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/user" element={
            <PrivateRoute>
              <UserBoard />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <AdminBoard />
            </PrivateRoute>
          } />
          
          <Route path="/mod" element={
            <PrivateRoute roles={['ROLE_MODERATOR']}>
              <ModeratorBoard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;