import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        
        {user ? (
          <>
            {user.roles.includes('ROLE_ADMIN') && (
              <Button color="inherit" component={Link} to="/admin">
                Admin
              </Button>
            )}
            
            {user.roles.includes('ROLE_MODERATOR') && (
              <Button color="inherit" component={Link} to="/mod">
                Moderator
              </Button>
            )}
            
            <Button color="inherit" component={Link} to="/user">
              User
            </Button>
            
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;