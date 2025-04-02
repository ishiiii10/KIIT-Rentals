import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Box,
  CircularProgress,
  Alert,
  useTheme,
  Divider,
  InputAdornment,
  IconButton,
  useMediaQuery,
  alpha,
  Chip,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import SecurityIcon from '@mui/icons-material/Security';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, LoginCredentials } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: LoginCredentials) => {
      setLoading(true);
      setError(null);
      try {
        console.log('Attempting login with:', values.email);
        const userData = await login(values);
        console.log('Login successful, user data:', userData);
        console.log('Token received:', userData.token ? 'Yes (length: ' + userData.token.length + ')' : 'No');
        
        // Double-check localStorage
        setTimeout(() => {
          const storedToken = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          console.log('Token in localStorage after login:', Boolean(storedToken));
          console.log('User in localStorage after login:', Boolean(storedUser));
          
          // Set user in context
          setUser(userData);
          
          // Navigate to home page
          navigate('/');
        }, 100);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
        setError(errorMessage);
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        display: 'flex', 
        alignItems: 'center', 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        py: { xs: 2, sm: 4, md: 6 },
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <Container 
        maxWidth={false} 
        disableGutters 
        sx={{ 
          width: '100%', 
          m: 0, 
          p: { xs: '0 16px', sm: '0 24px' },
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
            width: '100%',
            maxWidth: '1200px'
          }}
        >
          {/* Left side - Login form */}
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: { xs: '100%', md: 500 }, 
              flex: { md: 1 },
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Paper
              elevation={5}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                width: '100%',
                maxHeight: { xs: 'auto', md: '100%' },
                overflowY: 'auto'
              }}
            >
              {/* Decorative circles */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: `${alpha(theme.palette.primary.main, 0.07)}`,
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -70,
                  left: -70,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: `${alpha(theme.palette.secondary.main, 0.07)}`,
                  zIndex: 0,
                }}
              />
              
              <Box
                sx={{ 
                  width: 65, 
                  height: 65, 
                  borderRadius: '50%', 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <LockOutlinedIcon fontSize="large" color="primary" />
              </Box>
              
              <Typography 
                component="h1" 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold" 
                color="primary.main" 
                gutterBottom
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                align="center" 
                sx={{ mb: 3, maxWidth: 400 }}
              >
                Sign in to your account to continue your campus marketplace experience
              </Typography>
              
              {error && (
                <Alert 
                  severity="error" 
                  variant="filled"
                  sx={{ 
                    width: '100%', 
                    mb: 3,
                    borderRadius: 2,
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%', position: 'relative', zIndex: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, py: 0.5 }
                  }}
                  autoFocus
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, py: 0.5 }
                  }}
                  sx={{ mb: 2 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Link 
                    component={RouterLink} 
                    to="/forgot-password"
                    variant="body2"
                    sx={{ 
                      color: theme.palette.text.secondary,
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      }
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={!loading && <ArrowForwardIcon />}
                  sx={{ 
                    mt: 1, 
                    mb: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                    '&:hover': {
                      boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
                
                <Divider sx={{ my: 3 }}>
                  <Chip 
                    label="OR" 
                    size="small" 
                    sx={{ 
                      px: 1, 
                      fontSize: '0.75rem', 
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      color: theme.palette.text.secondary,
                    }} 
                  />
                </Divider>
                
                <Box textAlign="center" sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    Don't have an account? {' '}
                    <Link 
                      component={RouterLink} 
                      to="/register" 
                      fontWeight="bold"
                      sx={{ 
                        color: theme.palette.primary.main,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          {/* Right side - Illustration and info */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'relative',
              width: '100%',
              maxWidth: { md: 500 },
              flex: { md: 1 }
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box 
                component="img" 
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
                alt="Login illustration"
                sx={{
                  width: '100%',
                  maxWidth: 450,
                  height: 'auto',
                  mb: { xs: 3, md: 4 },
                  mx: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transform: 'perspective(1500px) rotateY(10deg)',
                  transition: 'transform 0.5s ease-in-out',
                  '&:hover': {
                    transform: 'perspective(1500px) rotateY(0deg)',
                  },
                }}
              />
              
              <Box sx={{ textAlign: 'center', maxWidth: "90%", mx: "auto" }}>
                <Typography 
                  variant="h5" 
                  color="primary" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                  }}
                >
                  KIIT Rentals Marketplace
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  The campus marketplace exclusively for KIIT students.
                  Buy, sell, and rent items directly from your fellow students.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box 
                      sx={{ 
                        p: 2,
                        flex: 1,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <SchoolIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Student Exclusive
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        p: 2,
                        flex: 1,
                        bgcolor: alpha(theme.palette.success.main, 0.05),
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <SecurityIcon color="success" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Trusted & Secure
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Box 
                      sx={{ 
                        p: 2,
                        flex: 1,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <LocalMallIcon color="info" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Buy & Rent
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        p: 2,
                        flex: 1,
                        bgcolor: alpha(theme.palette.warning.main, 0.05),
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <CheckCircleOutlineIcon color="warning" sx={{ fontSize: 32, mb: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Easy Listings
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 