import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActions,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../api/product';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckroomIcon from '@mui/icons-material/Checkroom';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  isOwner?: boolean;
}

const ProductCard = ({ product, onEdit, onDelete, isOwner = false }: ProductCardProps) => {
  const navigate = useNavigate();
  const isForRent = product.type === 'rent';

  // Debug log the product data to see if phone exists
  console.log('ProductCard received product:', product);
  console.log('Phone number from product:', product.phone);

  // If image is broken, use a placeholder
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null; // Prevent infinite loop
    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
  };

  // Format date to display only the date portion
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  console.log('Product type:', product.type, 'isForRent:', isForRent);

  // Get appropriate icon for category
  const getCategoryIcon = () => {
    switch(product.category) {
      case 'books': return <MenuBookIcon fontSize="small" />;
      case 'vehicles': return <DirectionsCarIcon fontSize="small" />;
      case 'snacks': return <FastfoodIcon fontSize="small" />;
      case 'clothing': return <CheckroomIcon fontSize="small" />;
      default: return <MenuBookIcon fontSize="small" />;
    }
  };

  // Get appropriate color for category
  const getCategoryColor = () => {
    switch(product.category) {
      case 'books': return 'secondary'; // Purple
      case 'vehicles': return 'info'; // Blue
      case 'snacks': return 'warning'; // Yellow/Orange
      case 'clothing': return 'error'; // Red
      default: return 'secondary';
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: 450, // Fixed total height
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 30px rgba(108, 99, 255, 0.15)',
        },
        minWidth: 0, // Prevents card from growing beyond container
      }}
    >
      {/* Status chip */}
      <Chip
        icon={isForRent ? <AccessTimeIcon /> : <LocalOfferIcon />}
        label={isForRent ? 'For Rent' : 'For Sale'}
        color={isForRent ? 'info' : 'success'}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          fontWeight: 'bold',
          px: 1,
          color: 'white',
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />

      {/* Category chip */}
      <Chip
        icon={getCategoryIcon()}
        label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        color={getCategoryColor() as 'success' | 'info' | 'warning' | 'error' | 'secondary'}
        size="small"
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          fontWeight: 'bold',
          px: 1,
          color: 'white',
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />

      {/* Product image - fixed height & enforced aspect ratio */}
      <Box 
        sx={{ 
          position: 'relative', 
          height: 200, 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          onError={handleImageError}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
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
              py: 0.5,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Listed: {formatDate(product.createdAt)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Product details - fixed height */}
      <CardContent sx={{ p: 2.5, pb: 1.5, height: 110, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            lineHeight: 1.4,
            height: '3.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 'auto' }}>
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            ₹{product.price.toFixed(2)}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{
              fontWeight: 'medium',
              ml: 0.5,
            }}
          >
            {isForRent ? '/ day' : ''}
          </Typography>
        </Stack>
      </CardContent>

      <Divider sx={{ mx: 2, opacity: 0.6 }} />

      {/* Action buttons - fixed height */}
      <CardActions sx={{ p: 2, pt: 1.5, height: 120, flexShrink: 0 }}>
        {isOwner ? (
          <Stack direction="row" spacing={1} width="100%">
            <Button 
              size="small" 
              color="primary"
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => onEdit && onEdit(product)}
              sx={{ 
                flex: 1,
                borderRadius: 2,
                py: 0.75,
              }}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete && product._id && onDelete(product._id)}
              sx={{ 
                flex: 1,
                borderRadius: 2, 
                py: 0.75,
              }}
            >
              Delete
            </Button>
          </Stack>
        ) : (
          <Stack direction="column" spacing={1} width="100%">
            <Button 
              size="medium" 
              color="primary"
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate(`/products/${product._id}`)}
              sx={{ 
                borderRadius: 2,
                py: 1,
                fontWeight: 'bold',
              }}
            >
              View Details
            </Button>
            
            {/* Phone number removed - only shows in product details page */}
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard; 