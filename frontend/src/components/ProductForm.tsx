import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress, 
  Paper,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Stack,
  Tooltip,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
  useMediaQuery,
  alpha,
  Chip
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../api/product';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SaveIcon from '@mui/icons-material/Save';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import WarningIcon from '@mui/icons-material/Warning';

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
  category: 'books' as 'books' | 'vehicles' | 'snacks' | 'clothing',
  phone: '',
  address: '',
  deadline: '',
  expiry: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  image: Yup.string()
    .required('Image is required')
    .test('is-valid-image', 'Please provide a valid image URL or upload a file', 
      function(value) {
        // Check if it's a base64 image
        if (value && value.startsWith('data:image')) {
          return true;
        }
        
        // Check if it's a URL
        if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
          return true;
        }
        
        return false;
      }),
  type: Yup.string().oneOf(['sale', 'rent'], 'Type must be either sale or rent').required('Listing type is required'),
  category: Yup.string().oneOf(['books', 'vehicles', 'snacks', 'clothing'], 'Please select a valid category').required('Category is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address should be at least 5 characters'),
  deadline: Yup.string()
    .test('valid-date', 'Deadline date is invalid or in the past', function(value) {
      // Optional field
      if (!value) return true;
      
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return !isNaN(date.getTime()) && date >= today;
    }),
  expiry: Yup.string()
    .test('valid-expiry', 'Expiry date is invalid or in the past', function(value) {
      const { category } = this.parent;
      
      // Only required for snacks
      if (category !== 'snacks') return true;
      
      // Required for snacks
      if (category === 'snacks' && !value) {
        return false;
      }
      
      if (value) {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return !isNaN(date.getTime()) && date >= today;
      }
      
      return true;
    })
    .test('required-for-snacks', 'Expiry date is required for snacks', function(value) {
      const { category } = this.parent;
      
      if (category === 'snacks' && !value) {
        return false;
      }
      
      return true;
    })
});

const ProductForm = ({ initialValues = defaultProduct, onSubmit, isLoading = false, title }: ProductFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isNewProduct = !initialValues._id;
  // Track uploaded image state
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialValues.image || null);

  // Check if image is from an upload (base64) or external URL
  const isImageUploaded = Boolean(uploadedImage && uploadedImage.startsWith('data:image'));

  // Function to handle file upload and convert to JPG
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only allow image files
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions - limit to max 800px width/height while preserving aspect ratio
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800; // Reduced from 1200 to 800
        
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          } else {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }
        
        try {
          // Create canvas to resize and convert image to JPG
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          
          // Draw image on canvas with white background (to handle transparency)
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to JPEG format with higher compression
            try {
              const jpgImage = canvas.toDataURL('image/jpeg', 0.6); // Increased compression (lower quality)
              
              // Check if resulting base64 string is not too long (max ~1MB)
              if (jpgImage.length > 1024 * 1024) {
                alert('The converted image is too large. Please use a smaller or more compressed image.');
                return;
              }
              
              console.log('Image converted successfully');
              setUploadedImage(jpgImage);
              setFieldValue('image', jpgImage);
            } catch (error) {
              console.error('Error converting image:', error);
              alert('There was an error processing your image. Please try a different image or use an image URL instead.');
            }
          }
        } catch (error) {
          console.error('Canvas error:', error);
          alert('There was an error processing your image. Please try a different image or use an image URL instead.');
        }
      };
      img.onerror = () => {
        console.error('Error loading image');
        alert('There was an error loading your image. Please try a different image or use an image URL instead.');
      };
      img.src = reader.result as string;
    };
    reader.onerror = () => {
      console.error('Error reading file');
      alert('There was an error reading your file. Please try a different image or use an image URL instead.');
    };
    reader.readAsDataURL(file);
  };

  // Add a function to fetch and convert URL image to base64
  const convertUrlToBase64 = async (url: string, setFieldValue: (field: string, value: string) => void) => {
    try {
      // Notify user
      alert('Converting image from URL. This may take a moment...');
      
      // Create an image element
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // This allows loading images from other domains
      
      img.onload = () => {
        try {
          // Calculate new dimensions
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;
          
          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            } else {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }
          
          // Create canvas to resize and convert image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to JPEG format
            const jpgImage = canvas.toDataURL('image/jpeg', 0.7);
            setUploadedImage(jpgImage);
            setFieldValue('image', jpgImage);
            alert('Image converted successfully!');
          }
        } catch (error) {
          console.error('Error converting URL to base64:', error);
          alert('Failed to convert the image. Please try a different URL or upload a file directly.');
        }
      };
      
      img.onerror = () => {
        console.error('Error loading image from URL');
        alert('Failed to load the image from URL. Please ensure it\'s a valid image URL with proper CORS settings, or upload a file directly.');
      };
      
      // Start loading the image
      img.src = url;
      
    } catch (error) {
      console.error('Error converting URL to base64:', error);
      alert('Failed to convert the image. Please try a different URL or upload a file directly.');
    }
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
              // Explicitly create a new object with all fields to ensure all required fields are included
              const productToSubmit = {
                _id: values._id,
                name: values.name,
                price: values.price,
                image: values.image,
                type: values.type,
                category: values.category,
                phone: values.phone,
                address: values.address,
                deadline: values.deadline,
                expiry: values.category === 'snacks' ? values.expiry : undefined
              };
              
              console.log('Form values before submission:', values);
              console.log('Phone number being submitted:', values.phone);
              console.log('Address being submitted:', values.address);
              console.log('Deadline being submitted:', values.deadline);
              
              if (values.category === 'snacks') {
                console.log('Expiry date being submitted:', values.expiry);
              }
              
              // Log image data characteristics for debugging
              if (values.image) {
                const isBase64 = values.image.startsWith('data:image');
                console.log('Image type:', isBase64 ? 'Base64 uploaded image' : 'URL');
                if (isBase64) {
                  console.log('Base64 image length:', values.image.length);
                  console.log('Base64 image size approx:', Math.round(values.image.length * 0.75 / 1024), 'KB');
                }
              }
              
              console.log('Final product object being submitted:', productToSubmit);
              
              await onSubmit(productToSubmit);
            } catch (error) {
              console.error('Error submitting form:', error);
              alert('Failed to submit the form. Please try again.');
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
                    <FormControl 
                      component="fieldset" 
                      fullWidth
                      error={touched.category && Boolean(errors.category)}
                      sx={{ 
                        p: 2, 
                        border: `1px solid ${touched.category && errors.category ? theme.palette.error.main : alpha(theme.palette.divider, 0.5)}`,
                        borderRadius: 2,
                        '&:hover': {
                          borderColor: touched.category && errors.category ? theme.palette.error.main : theme.palette.primary.main,
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
                        Category
                      </FormLabel>
                      <RadioGroup
                        row
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        sx={{ mt: 1 }}
                      >
                        <FormControlLabel 
                          value="books" 
                          control={<Radio color="success" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LocalOfferIcon color="success" fontSize="small" />
                              <Typography fontWeight={values.category === 'books' ? 'bold' : 'normal'}>
                                Books
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            mr: 4,
                            backgroundColor: values.category === 'books' ? alpha(theme.palette.success.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                        <FormControlLabel 
                          value="vehicles" 
                          control={<Radio color="info" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LocalOfferIcon color="info" fontSize="small" />
                              <Typography fontWeight={values.category === 'vehicles' ? 'bold' : 'normal'}>
                                Vehicles
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            backgroundColor: values.category === 'vehicles' ? alpha(theme.palette.info.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                        <FormControlLabel 
                          value="snacks" 
                          control={<Radio color="warning" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LocalOfferIcon color="warning" fontSize="small" />
                              <Typography fontWeight={values.category === 'snacks' ? 'bold' : 'normal'}>
                                Snacks
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            backgroundColor: values.category === 'snacks' ? alpha(theme.palette.warning.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                        <FormControlLabel 
                          value="clothing" 
                          control={<Radio color="error" />} 
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <LocalOfferIcon color="error" fontSize="small" />
                              <Typography fontWeight={values.category === 'clothing' ? 'bold' : 'normal'}>
                                Clothing
                              </Typography>
                            </Stack>
                          }
                          sx={{ 
                            backgroundColor: values.category === 'clothing' ? alpha(theme.palette.error.main, 0.1) : 'transparent',
                            borderRadius: 2,
                            px: 1,
                          }}
                        />
                      </RadioGroup>
                      {touched.category && errors.category && (
                        <FormHelperText>{errors.category}</FormHelperText>
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
                  
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label="Address"
                      placeholder="Enter your address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                      margin="normal"
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      Your address will only be shown to buyers on the product details page
                    </Typography>
                  </Box>
                  
                  {/* Deadline Date Field - For all products */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      id="deadline"
                      name="deadline"
                      label="Listing Deadline (Optional)"
                      type="date"
                      value={values.deadline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.deadline && Boolean(errors.deadline)}
                      helperText={
                        (touched.deadline && errors.deadline) || 
                        "When should this listing expire?"
                      }
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      This optional deadline will show on the product details page
                    </Typography>
                  </Box>
                  
                  {/* Expiry Date Field - Only visible for snacks category */}
                  {values.category === 'snacks' && (
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        id="expiry"
                        name="expiry"
                        label="Food Expiry Date"
                        type="date"
                        value={values.expiry}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.expiry && Boolean(errors.expiry)}
                        helperText={
                          (touched.expiry && errors.expiry) || 
                          "When does this food item expire?"
                        }
                        required
                        margin="normal"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WarningIcon color="warning" />
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        Required for food items. Will be shown on the product details page.
                      </Typography>
                    </Box>
                  )}
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
                    {values.image && values.image.startsWith('http') && (
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => convertUrlToBase64(values.image, setFieldValue)}
                        sx={{ mt: 1 }}
                      >
                        Convert URL to JPG (if having upload issues)
                      </Button>
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 3, mt: 4 }}>
                    <Box
                      sx={{
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                        borderRadius: 2,
                        p: 1,
                        backgroundColor: 'background.paper',
                        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                        position: 'relative',
                      }}
                    >
                      {values.image ? (
                        <>
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
                          {isImageUploaded && (
                            <Chip 
                              label="Uploaded Image" 
                              color="primary"
                              size="small"
                              sx={{ 
                                position: 'absolute', 
                                bottom: 10, 
                                right: 10,
                                fontWeight: 'bold' 
                              }}
                            />
                          )}
                          <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              Image Preview (JPG format)
                            </Typography>
                          </Box>
                        </>
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