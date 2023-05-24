import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {

  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  
  const [open, setOpen] = React.useState(false)
  const [info, setInfo] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRetypePassword, setShowRetypePassword] = React.useState(false);
  
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name cannot be empty')
      .matches(/^[A-z ]+$/,'Name should be text'),
    email: yup
      .string()
      .email('Email must be in valid format')
      .required('Email cannot be empty')
      .test('Unique Email', 'Email already in Use', function(){
        return new Promise((resolve, reject)=>{
          const { email, password, name } = this.parent
          supabaseClient.auth.signUp(
            {
              email,
              password,
              options: {
                data: {
                  name,
                }
              }
            }
          )
            .then(res => {
              if (res.error) resolve(false)
              else resolve(true)
            })
        })
      }),
    password: yup
      .string()
      .required('Password cannot be empty')
      .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,'Password must be use Aphanumeric'),
    retypePassword: yup
      .string()
      .required('Confirm password cannot be empty')
      .oneOf([yup.ref('password')], 'Confirm password must be same as password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      retypePassword:'',
    },
    validateOnBlur: false,
    validateOnChange:false,
    validationSchema: validationSchema,
    onSubmit: values => {
      openToast('Register New User Success')
      router.push('/app/dashboard')
    },
  });

  function openToast(errorDesc: string){
    setInfo(errorDesc)
    setOpen(true)
  }
  
  function closeError(){
    setOpen(false)
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}            
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}

          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowRetypePassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
            required
            fullWidth
            name="retypePassword"
            label="Retype Password"
            type={showRetypePassword ? 'text' : 'password'}
            id="retypePassword"
            onChange={formik.handleChange}
            value={formik.values.retypePassword}
            error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
            helperText={formik.touched.retypePassword && formik.errors.retypePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                {"Already Have Account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity="success" sx={{ width: '100%' }}>
          {info}
        </Alert>
      </Snackbar>
    </Container>
  );
}