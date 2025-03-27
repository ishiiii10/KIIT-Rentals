import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { 
  Container, 
  Typography, 
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
  useTheme,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getProducts } from '../api/product';
import { Product } from '../api/product';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [listingType, setListingType] = useState<'all' | 'sale' | 'rent'>('all');
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
    let filtered = [...products];
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by listing type
    if (listingType !== 'all') {
      filtered = filtered.filter((product) => product.type === listingType);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, products, listingType]);

  const handleListingTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newListingType: 'all' | 'sale' | 'rent' | null
  ) => {
    if (newListingType !== null) {
      setListingType(newListingType);
    }
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
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, sm: 2 } }}>
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
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
              </Box>
              
              <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <ToggleButtonGroup
                    value={listingType}
                    exclusive
                    onChange={handleListingTypeChange}
                    aria-label="listing type"
                    sx={{ 
                      height: '100%',
                      flex: 1,
                      '& .MuiToggleButtonGroup-grouped': {
                        borderRadius: 2,
                        mx: 0.5,
                        border: '1px solid rgba(88, 128, 97, 0.2) !important',
                      },
                    }}
                  >
                    <ToggleButton 
                      value="all" 
                      aria-label="all listings"
                      sx={{ 
                        flex: 1,
                        py: 1,
                        color: listingType === 'all' ? 'primary.main' : 'text.secondary',
                        fontWeight: listingType === 'all' ? 'bold' : 'normal',
                        bgcolor: listingType === 'all' ? 'rgba(88, 128, 97, 0.1)' : 'transparent',
                      }}
                    >
                      All
                    </ToggleButton>
                    <ToggleButton 
                      value="sale" 
                      aria-label="sale listings"
                      sx={{ 
                        flex: 1,
                        py: 1,
                        color: listingType === 'sale' ? 'success.main' : 'text.secondary',
                        fontWeight: listingType === 'sale' ? 'bold' : 'normal',
                        bgcolor: listingType === 'sale' ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ShoppingCartIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                      Buy
                    </ToggleButton>
                    <ToggleButton 
                      value="rent" 
                      aria-label="rent listings"
                      sx={{ 
                        flex: 1,
                        py: 1,
                        color: listingType === 'rent' ? 'info.main' : 'text.secondary',
                        fontWeight: listingType === 'rent' ? 'bold' : 'normal',
                        bgcolor: listingType === 'rent' ? 'rgba(3, 169, 244, 0.1)' : 'transparent',
                      }}
                    >
                      <AccessTimeIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                      Rent
                    </ToggleButton>
                  </ToggleButtonGroup>
                  
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<SortIcon />}
                    sx={{ 
                      py: 1.5, 
                      px: 2,
                      borderRadius: 2,
                      borderColor: 'rgba(88, 128, 97, 0.3)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Sort
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Results Section */}
        <Box sx={{ mt: 4 }}>
          {/* Filter information */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 1
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 'medium', color: 'text.secondary' }}
            >
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} 
              {listingType !== 'all' && ` for ${listingType === 'sale' ? 'sale' : 'rent'}`}
            </Typography>
            
            {searchTerm && (
              <Chip 
                label={`Search: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>

          {/* Products grid */}
          {loading ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mt: 3 }}>
              {Array(8).fill(null).map((_, index) => (
                <Box 
                  key={`skeleton-${index}`}
                  sx={{ 
                    width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, 
                    p: 1.5 
                  }}
                >
                  <Paper sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    height: 450, 
                    width: '100%'
                  }}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton variant="text" width="80%" height={32} />
                      <Skeleton variant="text" width="50%" height={24} />
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: 1 }} />
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Box>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <Paper 
                  sx={{ 
                    p: 4, 
                    textAlign: 'center', 
                    mt: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(88, 128, 97, 0.05)',
                    border: '1px solid rgba(88, 128, 97, 0.1)'
                  }}
                >
                  <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                    No products found
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Try changing your search criteria or check back later for new listings.
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
                    {filteredProducts.map((product) => (
                      <Box 
                        key={product._id} 
                        sx={{ 
                          width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, 
                          p: 1.5 
                        }}
                      >
                        <ProductCard product={product} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Products; 