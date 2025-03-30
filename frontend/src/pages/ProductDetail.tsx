import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';
import { getProducts } from '../api/product';
import { Product } from '../api/product';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        const products = await getProducts();
        const foundProduct = products.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 5 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error || 'Product not found'}
        </Alert>
      </Container>
    );
  }

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would handle payment/reservation
    alert(`This would open a ${product.type === 'rent' ? 'rental' : 'purchase'} form in a real application`);
  };

  // Format date for better display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric' as const, 
      month: 'long' as const, 
      day: 'numeric' as const 
    });
  };

  return (
    <Box sx={{ 
      bgcolor: '#fef2f2',  
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/products')}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Products
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 64px)' },
          maxWidth: '1000px',
          mx: 'auto',
          overflow: 'hidden',
          mb: 5
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Product Image Section */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%' }, 
            position: 'relative',
            height: { xs: '320px', sm: '400px', md: '450px' }
          }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {product.createdAt && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  py: 0.75,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Listed: {formatDate(product.createdAt)}
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Product Details Section */}
          <Box sx={{ 
            width: { xs: '100%', md: '50%' }, 
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            height: { md: 'auto' },
            maxHeight: { md: '550px' },
            overflow: { md: 'auto' },
            justifyContent: 'space-between'
          }}>
            <Box sx={{ 
              maxWidth: { md: '90%' },
              overflow: 'auto'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Typography variant="h4" component="h1" fontWeight="500">
                  {product.name}
                </Typography>
                <Chip
                  label={product.type === 'rent' ? 'For Rent' : 'For Sale'}
                  color={product.type === 'rent' ? 'info' : 'success'}
                  size="medium"
                  sx={{ fontWeight: '500' }}
                />
              </Box>

              {/* Price Display */}
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'baseline',
                  mt: 2,
                  mb: 4,
                  bgcolor: 'rgba(102, 157, 115, 0.15)',
                  p: 2,
                  borderRadius: 1,
                  width: 'fit-content'
                }}
              >
                <Typography 
                  variant="h5" 
                  component="span"
                  sx={{ 
                    fontSize: { xs: '1.75rem', sm: '2rem' },
                    fontWeight: '500',
                    color: 'text.primary'
                  }}
                >
                  ₹{product.price.toFixed(2)}
                </Typography>
                {product.type === 'rent' && 
                  <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>/ day</Typography>
                }
              </Box>

              {/* Contact Information */}
              {product.phone && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Contact Seller
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      color: '#d67eaa',
                      fontWeight: '500'
                    }}
                  >
                    <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                    +91 {product.phone}
                  </Typography>
                </Box>
              )}

              {/* Address Information */}
              {product.address && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      color: 'text.primary',
                      fontWeight: '500'
                    }}
                  >
                    <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem', mt: 0.3, color: '#4caf50' }} />
                    {product.address}
                  </Typography>
                </Box>
              )}

              {/* Deadline Information */}
              {product.deadline && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Available Until
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      color: 'text.primary',
                      fontWeight: '500'
                    }}
                  >
                    <EventIcon sx={{ mr: 1, fontSize: '1.2rem', mt: 0.3, color: '#1976d2' }} />
                    {new Date(product.deadline).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
              )}

              {/* Expiry Information - only for snacks */}
              {product.category === 'snacks' && product.expiry && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Expires On
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      color: 'error.main',
                      fontWeight: '500'
                    }}
                  >
                    <WarningIcon sx={{ mr: 1, fontSize: '1.2rem', mt: 0.3, color: 'warning.main' }} />
                    {new Date(product.expiry).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
              )}
              
              <Divider sx={{ my: 2 }} />

              {/* Product Description */}
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  wordBreak: 'break-word',
                  mb: 3
                }}
              >
                This {product.type === 'rent' ? 'rental item' : 'product'} is offered by a KIIT student. Contact the seller for more details or to arrange {product.type === 'rent' ? 'rental' : 'purchase'}.
              </Typography>
            </Box>

            <Box sx={{ 
              maxWidth: { md: '90%' },
              mt: 2 
            }}>
              {/* Action Buttons */}
              {product.phone && (
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<PhoneIcon />}
                  component="a"
                  href={`tel:+91${product.phone}`}
                  sx={{ 
                    mb: 2,
                    py: 1.5,
                    borderRadius: 1,
                    color: '#d67eaa',
                    borderColor: '#d67eaa',
                    '&:hover': {
                      borderColor: '#c06090',
                      backgroundColor: 'rgba(214, 126, 170, 0.04)'
                    }
                  }}
                >
                  Call Seller
                </Button>
              )}

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={product.type === 'rent' ? null : <ShoppingCartIcon />}
                onClick={handlePurchase}
                sx={{ 
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: '500',
                  backgroundColor: product.type === 'rent' ? '#669D73' : undefined,
                  '&:hover': {
                    backgroundColor: product.type === 'rent' ? '#4F8A5F' : undefined
                  }
                }}
              >
                {product.type === 'rent' ? 'Rent Now' : 'Buy Now'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetail; 