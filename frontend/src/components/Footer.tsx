import { Box, Container, Typography, Link, Grid, Divider, Stack, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #588061 0%, #3E5A43 100%)',
        color: 'white', 
        py: 6, 
        mt: 'auto',
        boxShadow: '0 -5px 20px rgba(88, 128, 97, 0.15)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalMallIcon sx={{ fontSize: 28, mr: 1 }} />
              <Typography variant="h5" fontWeight="bold" fontFamily="Poppins, sans-serif">
                KIIT RENTALS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Helping KIIT students buy, sell, and rent items from each other on campus.
              Find what you need or offer what you don't need.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.2)' 
                  }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.2)' 
                  }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.2)' 
                  }
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Platform
            </Typography>
            <Stack spacing={1.5}>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Browse Products
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Sell Items
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Rent Items
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Top Categories
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            <Stack spacing={1.5}>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Help Center
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Safety Guidelines
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Terms of Service
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9 }}>
                Privacy Policy
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" paragraph sx={{ opacity: 0.9 }}>
              KIIT University
              <br />
              Bhubaneswar, Odisha 751024
              <br />
              India
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Email: support@kiitrentals.com
              <br />
              Phone: +91 12345 67890
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} KIIT Rentals. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
              Terms
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
              Privacy
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8 }}>
              Cookies
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 