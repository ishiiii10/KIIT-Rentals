import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getProducts } from '../api/product';
import { Product } from '../api/product';
import ProductCard from '../components/ProductCard';
import { alpha } from '@mui/material/styles';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Get 4 random products as featured products
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const benefits = [
    {
      icon: <SearchIcon fontSize="large" color="primary" />,
      title: 'Find What You Need',
      description: 'Browse through a wide selection of items offered by fellow KIIT students.'
    },
    {
      icon: <MonetizationOnIcon fontSize="large" color="primary" />,
      title: 'Save Money',
      description: 'Buy or rent items at student-friendly prices, much lower than retail.'
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      title: 'Quick & Convenient',
      description: 'Get what you need fast without leaving campus or waiting for delivery.'
    },
    {
      icon: <VerifiedUserIcon fontSize="large" color="primary" />,
      title: 'Safe & Trusted',
      description: 'Trade within the trusted KIIT student community with secure transactions.'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #588061 0%, #3E5A43 100%)',
          color: 'white',
          overflow: 'hidden',
          pt: { xs: 6, sm: 8, md: 12 },
          pb: { xs: 8, sm: 10, md: 12 },
        }}
      >
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0,
          }}
        />
        
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  textAlign: { xs: 'center', md: 'left' } 
                }}
              >
                <Typography 
                  component="h1" 
                  variant={isMobile ? 'h3' : 'h2'} 
                  color="inherit" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Buy, Sell & Rent at KIIT
                </Typography>
                <Typography 
                  variant="h6" 
                  color="inherit" 
                  sx={{ 
                    mb: 4,
                    fontWeight: 400,
                    opacity: 0.9,
                    maxWidth: { md: '90%' },
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.5
                  }}
                >
                  The ultimate marketplace exclusively for KIIT students. From electronics to books, 
                  clothing to furniture — find everything you need on campus.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Button 
                    variant="contained" 
                    component={RouterLink} 
                    to="/products"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    sx={{ 
                      background: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        background: '#f5f5f5',
                      }
                    }}
                  >
                    Browse Products
                  </Button>
                  <Button 
                    variant="outlined" 
                    component={RouterLink} 
                    to="/my-products"
                    size="large"
                    startIcon={<StorefrontIcon />}
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      borderWidth: 2,
                      py: 1.5,
                      px: 3,
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 2,
                      }
                    }}
                  >
                    List Your Items
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src="https://img.freepik.com/free-vector/college-students-concept-illustration_114360-10205.jpg"
                alt="Students trading items"
                sx={{
                  width: '100%',
                  maxWidth: 550,
                  height: 'auto',
                  display: 'block',
                  mx: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'perspective(1500px) rotateY(-10deg)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container sx={{ py: { xs: 5, md: 10 }, position: 'relative' }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            width: 200, 
            height: 200, 
            backgroundColor: 'rgba(108, 99, 255, 0.05)', 
            borderRadius: '50%',
            top: '20%',
            left: -100,
            zIndex: -1
          }} 
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            width: 150, 
            height: 150, 
            backgroundColor: 'rgba(255, 101, 132, 0.05)', 
            borderRadius: '50%',
            bottom: '10%',
            right: -50,
            zIndex: -1
          }} 
        />
      
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography 
            variant="h3" 
            component="h2" 
            fontWeight="bold" 
            color="primary"
            gutterBottom
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' } }}
          >
            Why Use KIIT Rentals?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              mb: 2,
              fontSize: { xs: '1rem', md: '1.25rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            A platform created by students, for students, to make campus life easier and more affordable.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: 3,
                  p: 1,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 20px rgba(88, 128, 97, 0.15)',
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Box 
                    sx={{ 
                      mb: 2, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha('#588061', 0.1),
                      '& .MuiSvgIcon-root': {
                        fontSize: 40,
                        color: '#588061'
                      }
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="#588061"
                    sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, mb: 2 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'rgba(88, 128, 97, 0.05)', py: { xs: 5, md: 10 } }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" color="primary"
              sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' } }}>
              Featured Items
            </Typography>
            <Divider sx={{ mb: 2, mx: 'auto', width: 80, borderColor: theme.palette.primary.main, borderWidth: 3 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Discover what other students are offering right now
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/products"
              size="large"
              sx={{ 
                py: 1.5, 
                px: 4, 
                fontWeight: 'bold',
              }}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ py: { xs: 5, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" color="primary"
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' } }}>
            How It Works
          </Typography>
          <Divider sx={{ mb: 2, mx: 'auto', width: 80, borderColor: theme.palette.primary.main, borderWidth: 3 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Get started in three simple steps
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                height: '100%',
                p: 4, 
                textAlign: 'center',
                borderRadius: 4,
                border: '2px solid rgba(108, 99, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 15px 30px rgba(108, 99, 255, 0.1)',
                  border: '2px solid rgba(108, 99, 255, 0.3)',
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2, 
                  color: 'white', 
                  backgroundColor: theme.palette.primary.main,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                  mx: 'auto'
                }}
              >
                1
              </Box>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold" color="primary">
                Sign Up
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create a free account using your KIIT email address. Verify your student status and set up your profile in minutes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                height: '100%',
                p: 4, 
                textAlign: 'center',
                borderRadius: 4,
                border: '2px solid rgba(108, 99, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 15px 30px rgba(108, 99, 255, 0.1)',
                  border: '2px solid rgba(108, 99, 255, 0.3)',
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2, 
                  color: 'white', 
                  backgroundColor: theme.palette.primary.main,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                  mx: 'auto'
                }}
              >
                2
              </Box>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold" color="primary">
                Browse or List
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Look through items available for sale or rent, or list your own items with photos and detailed descriptions.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                height: '100%',
                p: 4, 
                textAlign: 'center',
                borderRadius: 4,
                border: '2px solid rgba(108, 99, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 15px 30px rgba(108, 99, 255, 0.1)',
                  border: '2px solid rgba(108, 99, 255, 0.3)',
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2, 
                  color: 'white', 
                  backgroundColor: theme.palette.primary.main,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                  mx: 'auto'
                }}
              >
                3
              </Box>
              <Typography variant="h4" component="h3" gutterBottom fontWeight="bold" color="primary">
                Connect & Exchange
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Message other students, agree on terms, and meet on campus to complete your transaction safely and easily.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/register"
            size="large"
            color="secondary"
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontWeight: 'bold',
            }}
          >
            Join KIIT Rentals Today
          </Button>
        </Box>
      </Container>

      {/* CTA Banner */}
      <Box 
        sx={{ 
          background: 'linear-gradient(45deg, rgba(88, 128, 97, 0.9) 0%, rgba(231, 181, 236, 0.9) 100%)',
          color: 'white',
          py: { xs: 4, sm: 6, md: 8 },
          mt: 4
        }}
      >
        <Container>
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                Ready to Start Trading?
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Join hundreds of KIIT students already buying, selling, and renting on campus.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/register"
                size="large"
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  background: 'white',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: '#f5f5f5',
                  }
                }}
              >
                Get Started Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 