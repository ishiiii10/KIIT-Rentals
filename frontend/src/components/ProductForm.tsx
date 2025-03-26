import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress, 
  Grid, 
  Paper,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Stack,
  Slider,
  Tooltip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  Input
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Product } from '../api/product';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SaveIcon from '@mui/icons-material/Save';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';
import PhoneIcon from '@mui/icons-material/Phone';

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: Product) => void;
  isLoading?: boolean;
  title?: string;
}

const defaultProduct = {
  name: '',
  price: 0,
  image: '',
  type: 'sale' as 'sale' | 'rent',
  phone: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  image: Yup.string()
    .required('Image is required')
    .test('is-url-or-file', 'Please provide a valid image URL or upload a file', 
      function(value) {
        // Accept value if it's a valid URL or the image was uploaded
        return (
          (value && value.startsWith('data:image')) || // Base64 image data
          (value && (value.startsWith('http://') || value.startsWith('https://')))
        );
      }),
  type: Yup.string().oneOf(['sale', 'rent'], 'Type must be either sale or rent').required('Listing type is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number')
});

const ProductForm = ({ initialValues = defaultProduct, onSubmit, isLoading = false, title }: ProductFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isNewProduct = !initialValues._id;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Function to handle file upload and convert to JPG
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: Function) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only allow image files
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to convert image to JPG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas with white background (to handle transparency)
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          // Convert to JPEG format
          const jpgImage = canvas.toDataURL('image/jpeg', 0.9); // 0.9 is quality (0-1)
          setUploadedImage(jpgImage);
          setFieldValue('image', jpgImage);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `${alpha(theme.palette.primary.main, 0.05)}`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `${alpha(theme.palette.secondary.main, 0.05)}`,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box 
        sx={{ 
          p: { xs: 3, md: 4 }, 
          textAlign: 'center',
          background: `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box 
          sx={{ 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            mb: 2
          }}
        >
          {isNewProduct ? 
            <StoreIcon fontSize="large" color="primary" /> : 
            <LocalOfferIcon fontSize="large" color="primary" />
          }
        </Box>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          fontWeight="bold" 
          color="primary.main"
          gutterBottom
        >
          {title || (isNewProduct ? 'Add New Listing' : 'Update Listing')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          {isNewProduct 
            ? 'Create a new listing to sell or rent your item to other students.' 
            : 'Update your listing details to keep your information current.'}
        </Typography>
      </Box>

      {/* Form */}
      <Box sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await onSubmit(values);
            } catch (error) {
              console.error('Error submitting form:', error);
            }
          }}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, setFieldValue }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
                {/* Left Column */}
                <Box sx={{ width: '100%', px: 2, mb: 4, flexBasis: { xs: '100%', md: '50%' } }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    color="text.primary" 
                    fontWeight="bold"
                    sx={{ 
                      mb: 3, 
                      display: 'flex', 
                      alignItems: 'center',
                      '&::before': {
                        content: '""',
                        display: 'inline-block',
                        width: 4,
                        height: 24,
                        backgroundColor: 'primary.main',
                        marginRight: 1.5,
                        borderRadius: 1
                      }
                    }}
                  >
                    Item Details
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Product Name"
                      placeholder="Enter a descriptive title"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ShoppingBagIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl 
                      fullWidth 
                      error={touched.price && Boolean(errors.price)}
                      variant="outlined"
                      margin="normal"
                    >
                      <InputLabel htmlFor="price">Price (₹)</InputLabel>
                      <OutlinedInput
                        id="price"
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        placeholder="0.00"
                        label="Price (₹)"
                        inputProps={{ min: 0, step: 0.01 }}
                        sx={{ borderRadius: 2 }}
                      />
                      {touched.price && errors.price && (
                        <FormHelperText>{errors.price}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <FormControl 
                      component="fieldset" 
                      fullWidth
                      error={touched.type && Boolean(errors.type)}
                      sx={{ 
                        p: 2, 
                        border: `1px solid ${touched.type && errors.type ? theme.palette.error.main : alpha(theme.palette.divider, 0.5)}`,
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: touched.type && errors.type ? theme.palette.error.main : theme.palette.primary.main,
                        }
                      }}
                    >
                      <FormLabel 
                        component="legend"
                        sx={{ 
                          px: 1, 
                          backgroundColor: 'background.paper',
                          fontWeight: 'medium'
                        }}
                      >
                        Listing Type
                      </FormLabel>
                      <RadioGroup
                        row
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        sx={{ mt: 1 }}
                      >
                        <FormControlLabel 
                          value="sale" 
                          control={<Radio color="success" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LocalOfferIcon color="success" fontSize="small" />
                              <Typography fontWeight={values.type === 'sale' ? 'bold' : 'normal'}>
                                For Sale
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            mr: 4,
                            backgroundColor: values.type === 'sale' ? alpha(theme.palette.success.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                        <FormControlLabel 
                          value="rent" 
                          control={<Radio color="info" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <AccessTimeIcon color="info" fontSize="small" />
                              <Typography fontWeight={values.type === 'rent' ? 'bold' : 'normal'}>
                                For Rent (per day)
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            backgroundColor: values.type === 'rent' ? alpha(theme.palette.info.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                      </RadioGroup>
                      {touched.type && errors.type && (
                        <FormHelperText>{errors.type}</FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phone"
                      label="Contact Phone Number"
                      placeholder="Enter your 10-digit phone number"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                            +91
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Box>
                </Box>
                
                {/* Right Column */}
                <Box sx={{ width: '100%', px: 2, mb: 4, flexBasis: { xs: '100%', md: '50%' } }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    color="text.primary" 
                    fontWeight="bold"
                    sx={{ 
                      mb: 3, 
                      display: 'flex', 
                      alignItems: 'center',
                      '&::before': {
                        content: '""',
                        display: 'inline-block',
                        width: 4,
                        height: 24,
                        backgroundColor: 'secondary.main',
                        marginRight: 1.5,
                        borderRadius: 1
                      }
                    }}
                  >
                    Image Preview
                  </Typography>

                  {/* File Upload Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Upload an image (JPG format):
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AddPhotoAlternateIcon />}
                      sx={{ 
                        borderRadius: 2, 
                        p: 1.5,
                        borderColor: alpha(theme.palette.divider, 0.8),
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}
                    >
                      Choose Image File
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                      />
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Your image will be automatically converted to JPG format
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }}>
                    <Chip label="OR" size="small" />
                  </Divider>
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      id="image"
                      name="image"
                      label="Image URL"
                      placeholder="Paste a direct image URL"
                      value={values.image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.image && Boolean(errors.image)}
                      helperText={
                        (touched.image && errors.image) || 
                        "Paste a direct URL to your product image"
                      }
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ImageIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Use a direct image URL. You can upload your image to Imgur or similar services and paste the direct link here.">
                              <IconButton edge="end">
                                <InfoIcon fontSize="small" color="action" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ mb: 3, mt: 4 }}>
                    {values.image ? (
                      <Box
                        sx={{
                          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                          borderRadius: 2,
                          p: 1,
                          backgroundColor: 'background.paper',
                          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                        }}
                      >
                        <Box
                          component="img"
                          src={values.image}
                          alt="Product preview"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                          }}
                          sx={{
                            width: '100%',
                            height: 220,
                            objectFit: 'contain',
                            borderRadius: 1,
                            backgroundColor: alpha(theme.palette.divider, 0.05),
                          }}
                        />
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Image Preview (JPG format)
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          border: `2px dashed ${alpha(theme.palette.divider, 0.5)}`,
                          borderRadius: 2,
                          p: 4,
                          backgroundColor: alpha(theme.palette.divider, 0.03),
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 220,
                        }}
                      >
                        <PhotoCameraIcon sx={{ fontSize: 48, color: alpha(theme.palette.text.secondary, 0.5), mb: 2 }} />
                        <Typography variant="body1" color="text.secondary" align="center">
                          Add an image URL or upload a file to see preview
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {/* Item Card Preview (simplified) */}
                  {values.name && values.price > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 'medium' }}>
                        Listing Preview:
                      </Typography>
                      <Paper
                        elevation={0}
                        sx={{ 
                          p: 2, 
                          borderRadius: 2, 
                          border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: 1, 
                            overflow: 'hidden',
                            flexShrink: 0, 
                            backgroundColor: alpha(theme.palette.divider, 0.1)
                          }}
                        >
                          {values.image ? (
                            <Box 
                              component="img" 
                              src={values.image} 
                              alt={values.name}
                              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Box 
                              sx={{ 
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                              }}
                            >
                              <ImageIcon color="disabled" />
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                          <Typography 
                            variant="subtitle2" 
                            noWrap 
                            sx={{ 
                              fontWeight: 'bold',
                              color: 'text.primary'
                            }}
                          >
                            {values.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography 
                              variant="body2" 
                              color="primary" 
                              sx={{ fontWeight: 'bold' }}
                            >
                              ₹{values.price}
                            </Typography>
                            {values.type === 'rent' && (
                              <Typography variant="caption" color="text.secondary">
                                / day
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                        <Chip
                          size="small"
                          label={values.type === 'rent' ? 'For Rent' : 'For Sale'}
                          color={values.type === 'rent' ? 'info' : 'success'}
                          sx={{ flexShrink: 0 }}
                        />
                      </Paper>
                    </Box>
                  )}
                </Box>
                
                {/* Submit Button - Full Width */}
                <Box sx={{ width: '100%', px: 2, mt: 2 }}>
                  <Divider sx={{ mb: 4 }} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={isLoading || !isValid}
                    startIcon={isLoading ? undefined : <SaveIcon />}
                    sx={{
                      py: 1.5,
                      px: 3,
                      fontWeight: 'bold',
                      borderRadius: 2,
                      boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
                      '&:hover': {
                        boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isNewProduct ? (
                      'Create Listing'
                    ) : (
                      'Update Listing'
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Formik>
      </Box>
    </Paper>
  );
};

export default ProductForm; 