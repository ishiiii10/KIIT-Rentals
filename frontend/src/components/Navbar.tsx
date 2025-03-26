import { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Avatar, 
  Button, 
  Tooltip, 
  MenuItem,
  Divider,
  useScrollTrigger,
  Slide,
  Badge,
  alpha
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/auth';

const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
  { name: 'Products', path: '/products', icon: <CategoryIcon /> },
];

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    handleCloseUserMenu();
    navigate('/login');
  };

  const getUserInitials = () => {
    return user?.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      : 'U';
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundImage: 'linear-gradient(90deg, #FDE9EA 0%, #F9E0DB 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          color: '#2E5D41',
        }}
      >
        <Container sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Toolbar disableGutters sx={{ height: { xs: 64, md: 70 } }}>
            {/* Logo - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 3 }}>
              <LocalMallIcon 
                sx={{ 
                  mr: 1.5,
                  fontSize: { md: 28, lg: 32 },
                  filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15))',
                  color: '#2E5D41'
                }} 
              />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: { md: '1.25rem', lg: '1.5rem' },
                  textShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
                  position: 'relative',
                  '&:hover': {
                    '&::after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    transform: 'scaleX(0)',
                    height: '2px',
                    bottom: -5,
                    left: 0,
                    backgroundColor: '#588061',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.3s ease-out'
                  }
                }}
              >
                KIIT RENTALS
              </Typography>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, mr: 2 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  backgroundColor: alpha('#588061', 0.1),
                  '&:hover': {
                    backgroundColor: alpha('#588061', 0.2),
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    minWidth: 200,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    mt: 1.5,
                  },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.path}
                    selected={isActive(page.path)}
                    sx={{
                      py: 1.5,
                      minHeight: 48,
                      borderLeft: isActive(page.path) ? '4px solid' : '4px solid transparent',
                      borderColor: isActive(page.path) ? '#588061' : 'transparent',
                      backgroundColor: isActive(page.path) ? alpha('#588061', 0.08) : 'transparent',
                      '&:hover': {
                        backgroundColor: alpha('#588061', 0.08),
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {page.icon && (
                        <Box component="span" sx={{ mr: 1, display: 'flex', color: isActive(page.path) ? "#2E5D41" : "#2E5D41" }}>
                          {page.icon}
                        </Box>
                      )}
                      <Typography textAlign="center" fontWeight={isActive(page.path) ? "600" : "500"} color={isActive(page.path) ? "#2E5D41" : "#2E5D41"}>
                        {page.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
                {isAuthenticated && (
                  <MenuItem 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/my-products"
                    selected={isActive('/my-products')}
                    sx={{
                      py: 1.5,
                      minHeight: 48,
                      borderLeft: isActive('/my-products') ? '4px solid' : '4px solid transparent',
                      borderColor: isActive('/my-products') ? '#588061' : 'transparent',
                      backgroundColor: isActive('/my-products') ? alpha('#588061', 0.08) : 'transparent',
                      '&:hover': {
                        backgroundColor: alpha('#588061', 0.08),
                      }
                    }}
                  >
                    <Typography textAlign="center" fontWeight={isActive('/my-products') ? "600" : "500"} color={isActive('/my-products') ? "#2E5D41" : "#2E5D41"}>
                      My Listings
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <LocalMallIcon 
                sx={{ 
                  mr: 1,
                  fontSize: 26,
                  filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15))',
                  color: '#2E5D41'
                }} 
              />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  letterSpacing: { xs: '.1rem', sm: '.15rem' },
                  color: 'inherit',
                  textDecoration: 'none',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  textShadow: '0px 2px 3px rgba(0, 0, 0, 0.15)'
                }}
              >
                KIIT RENTALS
              </Typography>
            </Box>

            {/* Desktop menu */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  startIcon={page.icon}
                  sx={{ 
                    color: '#2E5D41', 
                    display: 'flex',
                    alignItems: 'center',
                    height: 40,
                    px: 2.5,
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: isActive(page.path) ? 600 : 500,
                    backgroundColor: isActive(page.path) ? alpha('#2E5D41', 0.15) : 'transparent',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: alpha('#2E5D41', 0.15),
                    },
                    '&::after': isActive(page.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30%',
                      height: '3px',
                      backgroundColor: '#2E5D41',
                      borderRadius: '3px'
                    } : {}
                  }}
                >
                  {page.name}
                </Button>
              ))}
              {isAuthenticated && (
                <Button
                  component={Link}
                  to="/my-products"
                  onClick={handleCloseNavMenu}
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    color: '#2E5D41',
                    display: 'flex',
                    alignItems: 'center', 
                    height: 40,
                    px: 2.5,
                    position: 'relative',
                    overflow: 'hidden',
                    fontWeight: isActive('/my-products') ? 600 : 500,
                    backgroundColor: isActive('/my-products') ? alpha('#2E5D41', 0.15) : 'transparent',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: alpha('#2E5D41', 0.15),
                    },
                    '&::after': isActive('/my-products') ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '30%',
                      height: '3px',
                      backgroundColor: '#2E5D41',
                      borderRadius: '3px'
                    } : {}
                  }}
                >
                  My Listings
                </Button>
              )}
            </Box>

            {/* User menu */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: '2px solid', borderColor: alpha('#2E5D41', 0.3) }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#E7B5EC',
                          color: '#2E5D41',
                          fontWeight: 'bold',
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getUserInitials()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ 
                      mt: '45px',
                      '& .MuiPaper-root': {
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Box sx={{ px: 2, py: 1.5, textAlign: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="primary">
                        {user?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem component={Link} to="/my-products" onClick={handleCloseUserMenu} sx={{ py: 1.5, minHeight: 48 }}>
                      <ShoppingCartIcon sx={{ mr: 2, fontSize: 20 }} color="primary" />
                      <Typography>My Listings</Typography>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5, minHeight: 48 }}>
                      <Typography color="error">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  <Button 
                    component={Link} 
                    to="/login" 
                    sx={{ 
                      color: '#2E5D41', 
                      marginRight: 1.5,
                      fontWeight: 500,
                      px: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha('#2E5D41', 0.5),
                      '&:hover': {
                        backgroundColor: alpha('#2E5D41', 0.15),
                        borderColor: '#2E5D41',
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    component={Link} 
                    to="/register" 
                    sx={{ 
                      color: '#2E5D41', 
                      fontWeight: 500,
                      px: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha('#2E5D41', 0.5),
                      '&:hover': {
                        backgroundColor: alpha('#2E5D41', 0.15),
                        borderColor: '#2E5D41',
                      }
                    }}
                  >
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar; 