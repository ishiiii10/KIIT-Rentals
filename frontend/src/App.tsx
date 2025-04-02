import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import MyProducts from './pages/MyProducts';
import Login from './pages/Login';
import Register from './pages/Register';

// Create a custom theme with new nature-inspired and soft colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#588061', // Forest green
      light: '#869F77', // Sage green
      dark: '#3E5A43', // Dark forest green
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E7B5EC', // Soft lavender
      light: '#F0CCEF', // Light lavender
      dark: '#C58ECE', // Dark lavender
      contrastText: '#333333',
    },
    background: {
      default: '#FDE9EA', // Soft pink background
      paper: '#FFFFFF',
    },
    error: {
      main: '#E76D6D',
    },
    success: {
      main: '#588061', // Using primary forest green for success too
    },
    info: {
      main: '#869F77', // Using sage green for info
    },
    warning: {
      main: '#F9C58E', // Soft amber
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          overflowX: 'hidden',
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 12px rgba(88, 128, 97, 0.2)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #588061 30%, #869F77 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #E7B5EC 30%, #F0CCEF 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 30px rgba(88, 128, 97, 0.15)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: { xs: 2, sm: 3, md: 4 },
          paddingRight: { xs: 2, sm: 3, md: 4 },
          maxWidth: 1600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(88, 128, 97, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh',
              width: '100%',
              overflowX: 'hidden',
            }}
          >
            <Navbar />
            <Box 
              sx={{ 
                flex: 1,
                width: '100%',
                maxWidth: '100%',
                mx: 'auto',
                overflow: 'hidden',
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
        <ToastContainer 
          position="bottom-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" 
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
