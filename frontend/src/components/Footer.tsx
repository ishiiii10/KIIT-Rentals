import { Box, Container, Typography, Link, Grid, Divider, Stack, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #588061 0%, #3E5A43 100%)',
        color: 'white', 
        py: { xs: 4, sm: 5, md: 6 }, 
        mt: 'auto',
        boxShadow: '0 -5px 20px rgba(88, 128, 97, 0.15)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start" justifyContent="space-between">
          {/* Brand Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalMallIcon sx={{ fontSize: { xs: 24, md: 28 }, mr: 1.5 }} />
                <Typography variant="h5" fontWeight="bold" fontFamily="Poppins, sans-serif" 
                  sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                  KIIT RENTALS
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, fontSize: { xs: '0.9rem', md: '1rem' }, lineHeight: 1.6 }}>
                Helping KIIT students buy, sell, and rent items from each other on campus.
                Find what you need or offer what you don't need.
              </Typography>
            </Box>

            {/* Social Media Links */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold"
                sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 2 }}>
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://www.linkedin.com/in/ishika-gupta-242792303/"
                  target="_blank"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Ishika LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://www.linkedin.com/in/anushrey-shubham-1060b7315/"
                  target="_blank"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Anushrey LinkedIn"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://github.com/ishiiii10/"
                  target="_blank"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-3px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links Container */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              {/* Quick Links Columns */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom 
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 2.5, borderBottom: '2px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  Platform
                </Typography>
                <Stack spacing={1.5}>
                  <Link component={RouterLink} to="/products" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Browse Products
                  </Link>
                  <Link component={RouterLink} to="/my-products/new" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Sell Items
                  </Link>
                  <Link component={RouterLink} to="/products" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Rent Items
                  </Link>
                  <Link component={RouterLink} to="/products" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Top Categories
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 2.5, borderBottom: '2px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  Support
                </Typography>
                <Stack spacing={1.5}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Help Center
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Safety Guidelines
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Terms of Service
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.5 }}>
                    Privacy Policy
                  </Link>
                </Stack>
              </Grid>

              {/* Contact Info Column */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" fontWeight="bold" gutterBottom
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, mb: 2.5, borderBottom: '2px solid rgba(255,255,255,0.2)', pb: 1 }}>
                  Contact Us
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PhoneIcon sx={{ mr: 1.5, fontSize: 20, mt: 0.3, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium' }}>
                        +91 8340457343
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium' }}>
                        +91 7004884668
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <EmailIcon sx={{ mr: 1.5, fontSize: 20, mt: 0.3, opacity: 0.9 }} />
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, wordBreak: 'break-all', fontWeight: 'medium' }}>
                        22052461@kiit.ac.in
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, wordBreak: 'break-all', fontWeight: 'medium' }}>
                        22052443@kiit.ac.in
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ mr: 1.5, fontSize: 20, mt: 0.3, opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium', lineHeight: 1.6 }}>
                      KIIT University
                      <br />
                      Bhubaneswar, Odisha 751024
                      <br />
                      India
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 }, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' }, 
          gap: 2,
          py: 1
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8, textAlign: { xs: 'center', sm: 'left' } }}>
            © {currentYear} KIIT Rentals. All rights reserved.
          </Typography>
          <Stack 
            direction="row" 
            spacing={{ xs: 3, md: 4 }} 
            divider={<Box component="span" sx={{ opacity: 0.3 }}>•</Box>}
            justifyContent={{ xs: 'center', sm: 'flex-end' }} 
            width={{ xs: '100%', sm: 'auto' }}
          >
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