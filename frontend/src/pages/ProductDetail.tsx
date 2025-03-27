import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
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
    alert('This would open a payment or contact form in a real application');
  };

  return (
    <Container sx={{ py: 5 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={2} sx={{ overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxHeight: { xs: '300px', md: '500px' },
              }}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <Chip
                  label={product.type === 'rent' ? 'For Rent' : 'For Sale'}
                  color={product.type === 'rent' ? 'info' : 'success'}
                  sx={{ ml: 2 }}
                />
              </Box>

              <Typography variant="h5" color="primary" sx={{ mt: 2, fontWeight: 'bold' }}>
                ₹{product.price.toFixed(2)}
                {product.type === 'rent' && <Typography component="span" variant="body2" sx={{ ml: 1 }}>/ day</Typography>}
              </Typography>

              {product.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <PhoneIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  <Typography variant="body1" color="text.secondary">
                    Contact: <Typography component="span" fontWeight="bold" color="secondary.main">+91 {product.phone}</Typography>
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="body1" sx={{ mb: 3 }}>
                This product is offered by a KIIT student. Contact the seller for more details about the product.
              </Typography>

              {product.phone && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  fullWidth
                  startIcon={<PhoneIcon />}
                  component="a"
                  href={`tel:+91${product.phone}`}
                  sx={{ mb: 2 }}
                >
                  Contact Seller
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                startIcon={<ShoppingCartIcon />}
                onClick={handlePurchase}
                sx={{ mt: 2 }}
              >
                {product.type === 'rent' ? 'Rent Now' : 'Buy Now'}
              </Button>

              {!isAuthenticated && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                  You need to log in to purchase this item
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetail; 