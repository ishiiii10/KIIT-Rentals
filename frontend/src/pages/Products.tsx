import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  CircularProgress, 
  TextField, 
  InputAdornment,
  Paper,
  Divider,
  Chip,
  Button,
  Skeleton,
  Stack,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { getProducts } from '../api/product';
import { Product } from '../api/product';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load products. Please try again later.');
        console.error('Products fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const renderSkeletons = () => {
    return Array(8).fill(null).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={`skeleton-${index}`}>
        <Paper sx={{ borderRadius: 2, overflow: 'hidden', height: '100%' }}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" width="80%" height={32} />
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: 1 }} />
          </Box>
        </Paper>
      </Grid>
    ));
  };

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 76, 76, 0.05)',
            border: '1px solid rgba(255, 76, 76, 0.1)',
          }}
        >
          <Typography color="error" variant="h5" gutterBottom fontWeight="bold">
            Oops! Something went wrong
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box 
      sx={{ 
        backgroundColor: 'background.default',
        minHeight: '100vh',
        pt: { xs: 3, sm: 4 },
        pb: { xs: 6, md: 8 }
      }}
    >
      <Container>
        {/* Header Section */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            color="primary"
            sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' } }}
          >
            Explore Products
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Discover what fellow KIIT students are selling and renting
          </Typography>
          
          {/* Search and Filter Bar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              border: '1px solid rgba(88, 128, 97, 0.1)',
              backgroundColor: 'white',
            }}
          >
            <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      backgroundColor: 'rgba(88, 128, 97, 0.03)',
                      '&:hover': {
                        backgroundColor: 'rgba(88, 128, 97, 0.05)',
                      },
                    }
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(88, 128, 97, 0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    }
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<FilterListIcon />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    borderColor: 'rgba(88, 128, 97, 0.3)',
                  }}
                >
                  Filter
                </Button>
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<SortIcon />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: 2,
                    borderColor: 'rgba(88, 128, 97, 0.3)',
                  }}
                >
                  Sort by: Newest
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Categories */}
        <Box sx={{ mb: 4 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: 'wrap',
              gap: 1,
              '& > *': {
                mb: 1
              }
            }}
          >
            <Chip 
              icon={<LocalOfferIcon />} 
              label="All Products" 
              color="primary" 
              variant="filled"
              sx={{ 
                fontWeight: 'bold', 
                py: 2.5, 
                px: 1,
                borderRadius: 2
              }} 
            />
            <Chip 
              label="Electronics" 
              variant="outlined" 
              sx={{ 
                py: 2.5, 
                px: 1, 
                borderRadius: 2,
                borderColor: 'rgba(88, 128, 97, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(88, 128, 97, 0.05)',
                }
              }} 
            />
            <Chip 
              label="Books" 
              variant="outlined" 
              sx={{ 
                py: 2.5, 
                px: 1, 
                borderRadius: 2,
                borderColor: 'rgba(88, 128, 97, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(88, 128, 97, 0.05)',
                }
              }} 
            />
            <Chip 
              label="Furniture" 
              variant="outlined" 
              sx={{ 
                py: 2.5, 
                px: 1, 
                borderRadius: 2,
                borderColor: 'rgba(88, 128, 97, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(88, 128, 97, 0.05)',
                }
              }} 
            />
            <Chip 
              label="Clothing" 
              variant="outlined" 
              sx={{ 
                py: 2.5, 
                px: 1, 
                borderRadius: 2,
                borderColor: 'rgba(88, 128, 97, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(88, 128, 97, 0.05)',
                }
              }} 
            />
            <Chip 
              label="Sports" 
              variant="outlined" 
              sx={{ 
                py: 2.5, 
                px: 1, 
                borderRadius: 2,
                borderColor: 'rgba(88, 128, 97, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(88, 128, 97, 0.05)',
                }
              }} 
            />
          </Stack>
        </Box>

        {/* Results Count */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" color="text.secondary">
            {loading ? 'Loading products...' : 
              filteredProducts.length === 0 ? 'No products found' : 
              `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`
            }
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {loading ? (
            renderSkeletons()
          ) : filteredProducts.length === 0 ? (
            <Grid item xs={12}>
              <Paper
                sx={{
                  py: { xs: 6, md: 8 },
                  px: { xs: 2, sm: 4 },
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: 'rgba(88, 128, 97, 0.03)',
                  border: '1px dashed rgba(88, 128, 97, 0.2)',
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <SearchIcon sx={{ fontSize: 60, color: 'primary.main', opacity: 0.5 }} />
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  No products found
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                  We couldn't find any products matching your search criteria. Try adjusting your filters or search term.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </Paper>
            </Grid>
          ) : (
            filteredProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products; 