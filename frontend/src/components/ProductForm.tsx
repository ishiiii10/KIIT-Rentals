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
  IconButton
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Product } from '../api/product';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: Product) => void;
  isLoading?: boolean;
}

const defaultProduct = {
  name: '',
  price: 0,
  image: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  image: Yup.string()
    .required('Image URL is required')
    .url('Must be a valid URL'),
});

const ProductForm = ({ initialValues = defaultProduct, onSubmit, isLoading = false }: ProductFormProps) => {
  const [product, setProduct] = useState<Product>(initialValues);

  useEffect(() => {
    setProduct(initialValues);
  }, [initialValues]);

  const isNewProduct = !product._id;

  return (
    <Formik
      initialValues={product}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: 'primary.main',
                    mb: 3
                  }}
                >
                  {product._id ? 'Update Product' : 'Add New Product'}
                </Typography>
                
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
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
                
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={touched.price && Boolean(errors.price)}
                  sx={{ mb: 2 }}
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
                    label="Price (₹)"
                    sx={{ borderRadius: 2 }}
                  />
                  <FormHelperText>
                    {touched.price && errors.price ? errors.price : 
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'info.main' }} />
                        <Typography variant="caption">
                          {values.price < 500 ? 'This will be listed as "For Rent"' : 'This will be listed as "For Sale"'}
                        </Typography>
                      </Stack>
                    }
                  </FormHelperText>
                </FormControl>
                
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    gutterBottom 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between' 
                    }}
                  >
                    <span>Listing Type:</span>
                    <Typography component="span" fontWeight="bold" color={values.price < 500 ? 'info.main' : 'success.main'}>
                      {values.price < 500 ? 'For Rent' : 'For Sale'}
                    </Typography>
                  </Typography>
                  <Slider
                    value={values.price < 500 ? 0 : 1}
                    onChange={(_, newValue) => {
                      setFieldValue('price', newValue === 0 ? 250 : 1000);
                    }}
                    step={1}
                    marks={[
                      { value: 0, label: 'Rent' },
                      { value: 1, label: 'Sale' },
                    ]}
                    min={0}
                    max={1}
                    sx={{ 
                      color: values.price < 500 ? 'info.main' : 'success.main',
                      '& .MuiSlider-mark': {
                        height: 8,
                        width: 8,
                        borderRadius: '50%',
                      },
                    }}
                  />
                </Box>
                
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
                    "Paste a direct URL to an image (JPG, PNG, etc.)"
                  }
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Add image URL">
                          <IconButton edge="end">
                            <AddPhotoAlternateIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom color="text.secondary" fontWeight="medium">
                  Product Preview
                </Typography>
                
                {values.image ? (
                  <Box
                    sx={{
                      width: '100%',
                      maxHeight: 300,
                      overflow: 'hidden',
                      borderRadius: 2,
                      position: 'relative',
                      mb: 2,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box
                      component="img"
                      src={values.image}
                      alt="Product Preview"
                      sx={{
                        width: '100%',
                        objectFit: 'contain',
                        maxHeight: 300,
                      }}
                      onError={() => {
                        setFieldValue('image', '');
                      }}
                    />
                  </Box>
                ) : (
                  <Paper
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: 250,
                      borderRadius: 2,
                      border: '2px dashed rgba(108, 99, 255, 0.3)',
                      backgroundColor: 'rgba(108, 99, 255, 0.03)',
                      mb: 2,
                    }}
                  >
                    <PhotoCameraIcon 
                      sx={{ 
                        fontSize: 60, 
                        color: 'primary.main',
                        opacity: 0.5,
                        mb: 2
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" align="center">
                      Add an image URL to see a preview
                    </Typography>
                  </Paper>
                )}
                
                <Box sx={{ width: '100%', px: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      mb: 3,
                      border: '1px solid rgba(108, 99, 255, 0.2)',
                      borderRadius: 2,
                      backgroundColor: 'white',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Product Name:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" noWrap sx={{ maxWidth: 200 }}>
                        {values.name || 'Not specified'}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Price:
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="bold" 
                        color={values.price < 500 ? 'info.main' : 'success.main'}
                      >
                        ₹{values.price || 0} 
                        <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                          {values.price < 500 ? '/ day' : ''}
                        </Typography>
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Listing Type:
                      </Typography>
                      <Typography 
                        variant="body1" 
                        fontWeight="bold"
                        color={values.price < 500 ? 'info.main' : 'success.main'}
                      >
                        {values.price < 500 ? 'For Rent' : 'For Sale'}
                      </Typography>
                    </Stack>
                  </Paper>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={isLoading}
                    sx={{ py: 1.5, borderRadius: 2 }}
                  >
                    {isLoading ? 
                      <CircularProgress size={24} /> : 
                      isNewProduct ? 'Add Product' : 'Update Product'
                    }
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm; 