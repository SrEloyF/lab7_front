import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { login } = useAuth();

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await login(values); 
            window.location.href = '/';
          } catch (error) {
            setErrors({
              general: 'Invalid credentials or server error',
            });
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 2 }}
            />

            {/* Mostrar errores generales */}
            {errors.general && (
              <Typography color="error" sx={{ mt: 1 }}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
