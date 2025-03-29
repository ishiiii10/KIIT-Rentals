import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckroomIcon from '@mui/icons-material/Checkroom';
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Get category from URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam && ['books', 'vehicles', 'snacks', 'clothing'].includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory(null);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products. Please try again later.';
        setError(errorMessage);
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
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, products, listingType, selectedCategory]);

  const handleListingTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newListingType: 'all' | 'sale' | 'rent' | null
  ) => {
    if (newListingType !== null) {
      setListingType(newListingType);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    // Update URL query parameter
    if (category) {
      navigate(`/products?category=${category}`);
    } else {
      navigate('/products');
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'books': return <MenuBookIcon />;
      case 'vehicles': return <DirectionsCarIcon />;
      case 'snacks': return <FastfoodIcon />;
      case 'clothing': return <CheckroomIcon />;
      default: return <MenuBookIcon />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch(category) {
      case 'books': return 'success';
      case 'vehicles': return 'info';
      case 'snacks': return 'warning';
      case 'clothing': return 'error';
      default: return 'default';
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
            {selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` 
              : 'Explore Products'}
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

          {/* Category Filter Chips */}
          {selectedCategory && (
            <Box sx={{ mb: 3 }}>
              <Chip
                icon={getCategoryIcon(selectedCategory)}
                label={`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                color={getCategoryColor(selectedCategory)}
                onDelete={() => handleCategoryChange(null)}
                sx={{ 
                  p: 0.5, 
                  fontWeight: 'bold',
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            </Box>
          )}
          
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
              {listingType !== 'all' && `