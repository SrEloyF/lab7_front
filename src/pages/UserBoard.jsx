import { Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const UserBoard = () => {
  const { user } = useAuth();

  console.log('Usuario completo:', user);
  console.log('Roles recibidos:', user?.roles);

  const getContent = () => {
    if (user?.roles?.includes('ROLE_ADMIN')) {
      return "Bienvenido Administrador - Panel avanzado";
    } else if (user?.roles?.includes('ROLE_MODERATOR')) {
      return "Panel de Moderación - Herramientas de gestión";
    } else {
      return "Área de usuario básico - Contenido personalizado";
    }
  };

  return (
    <Typography variant="h4" sx={{ p: 3 }}>
      {getContent()}
    </Typography>
  );
};

export default UserBoard;