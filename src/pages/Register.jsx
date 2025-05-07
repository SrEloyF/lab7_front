import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Box, Typography } from '@mui/material';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const Register = () => {
  const { register } = useAuth();

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await register(values);
            window.location.href = '/login';
          } catch (error) {
            setErrors({ general: error.message }); 
          }
          setSubmitting(false);
        }}
      >
        {({ 
          handleSubmit, 
          handleChange, 
          values, 
          errors,
          touched 
        }) => ( 
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ mb: 2 }}
            />

            {}
            {errors.general && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errors.general}
              </Typography>
            )}
            
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;