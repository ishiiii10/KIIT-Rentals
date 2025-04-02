import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography,
  Box,
  Button,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../api/product';
import { Product } from '../api/product';
import ProductCard from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

const MyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [isAuthenticated, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      // In a real app, this would filter by user ID
      // For now, we'll just show all products as if they belong to the user
      setProducts(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Failed to load your products. Please try again.');
      } else {
        setError('Failed to load your products. Please try again.');
      }
      console.error('Fetch products error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = () => {
    setProductToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await deleteProduct(productToDelete);
      setProducts(products.filter(p => p._id !== productToDelete));
      setSuccess('Product deleted successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Failed to delete product. Please try again.');
      } else {
        setError('Failed to delete product. Please try again.');
      }
      console.error('Delete product error:', error);
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleSubmit = async (values: Product) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Ensure all required fields are present, especially phone
      const productData = {
        ...values,
        name: values.name,
        price: values.price,
        image: values.image,
        type: values.type,
        phone: values.phone,
      };
      
      console.log('Product data being submitted:', productData);
      
      if (productToEdit && productToEdit._id) {
        // Update existing product
        const updatedProduct = await updateProduct(productToEdit._id, productData);
        setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
        setSuccess('Product updated successfully');
      } else {
        // Create new product
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
        setSuccess('Product created successfully');
      }
      setIsFormOpen(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Failed to save product. Please try again.');
      } else {
        setError('Failed to save product. Please try again.');
      }
      console.error('Save product error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Listings
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
        >
          Add New Item
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}

      {products.length === 0 ? (
        <Box sx={{ 
          py: 10, 
          textAlign: 'center',
          border: '2px dashed #ccc',
          borderRadius: 2,
          bgcolor: '#f9f9f9'
        }}>
          <Typography variant="h6" gutterBottom>
            You haven't listed any items yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start selling or renting your items to other students
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenForm}
          >
            List Your First Item
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {products.map((product) => (
            <Box 
              key={product._id} 
              sx={{ 
                width: { xs: '100%', sm: '50%', md: '33.33%' }, 
                p: 1.5 
              }}
            >
              <ProductCard 
                product={product} 
                isOwner={true}
                onEdit={handleEditProduct}
                onDelete={handleDeleteClick}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Add/Edit Product Form Dialog */}
      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {productToEdit ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <ProductForm 
            initialValues={productToEdit || undefined} 
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            title={productToEdit ? 'Edit Product' : 'Add New Product'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsFormOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            disabled={isSubmitting}
            variant="contained"
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyProducts; 