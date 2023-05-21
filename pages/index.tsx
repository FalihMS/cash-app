import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight:'bold' }} gutterBottom>
          Cash App
        </Typography>
        <Typography variant="h5" component="h1" gutterBottom>
          Manage, Grow, and Own Your Future Wealth
        </Typography>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            spacing: 2,
          }}
        >
        <Button sx={{mx: 1}} href="/auth/login" variant="contained" color="primary">
          Sign In
        </Button>
          <Button sx={{mx: 1}} href="/auth/register" variant="outlined" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
