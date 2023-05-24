import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function SignIn() {

  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  
  const [open, setOpen] = React.useState(false)
  const [info, setInfo] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false);
  
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .test('Invalid Credential', 'Invalid Username or Password, Failed to Sign In', function(){
        return new Promise((resolve, reject) => {
          const { email, password } = this.parent
          supabaseClient.auth.signInWithPassword({
            email,
            password,
          })
            .then(res => {
              if (res.error) resolve(false)
              else resolve(true)
            })
        })
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange:false,
    validationSchema: validationSchema,
    onSubmit: values => {
      openToast('Authentication Success')
      router.push('/app/dashboard')
    },
  });

  
  function openToast(errorDesc: string){
    setInfo(errorDesc)
    setOpen(true)
  }

  function handleClose(){
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
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
            id="password"
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            value={formik.values.password}

            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
            <Grid item xs>
              <Link href="#" variant="body2">
                
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Create New Account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>      
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={()=> setOpen(false)}>
        <Alert onClose={()=> setOpen(false)} severity="success" sx={{ width: '100%' }}>
          {info}
        </Alert>
      </Snackbar>
    </Container>
  );
}
