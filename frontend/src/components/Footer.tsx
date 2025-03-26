import { Box, Container, Typography, Link, Divider, Stack, IconButton } from '@mui/material';
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
        py: { xs: 2, sm: 3, md: 3.5 }, 
        mt: 'auto',
        boxShadow: '0 -3px 10px rgba(88, 128, 97, 0.15)'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 },
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          {/* Brand Column */}
          <Box sx={{ width: { xs: '100%', md: '30%' } }}>
            <Box sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalMallIcon sx={{ fontSize: { xs: 20, md: 24 }, mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" fontFamily="Poppins, sans-serif" 
                  sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                  KIIT RENTALS
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem', lineHeight: 1.5 }}>
                Helping KIIT students buy, sell, and rent items from each other on campus.
              </Typography>
            </Box>

            {/* Social Media Links */}
            <Box sx={{ mb: 1.5 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.9rem', mb: 1 }}>
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://www.linkedin.com/in/ishika-gupta-242792303/"
                  target="_blank"
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Ishika LinkedIn"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://www.linkedin.com/in/anushrey-shubham-1060b7315/"
                  target="_blank"
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Anushrey LinkedIn"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  color="inherit" 
                  component="a"
                  href="https://github.com/ishiiii10/"
                  target="_blank"
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="GitHub"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Box>

          {/* Footer Links Container */}
          <Box sx={{ width: { xs: '100%', md: '65%' } }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                flexWrap: 'wrap',
                gap: { xs: 2, sm: 3, md: 4 }
              }}
            >
              {/* Platform Column */}
              <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', sm: '30%', md: 'auto' } }}>
                <Typography variant="subtitle2" fontWeight="bold" 
                  sx={{ fontSize: '0.9rem', mb: 1, borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 0.5 }}>
                  Platform
                </Typography>
                <Stack spacing={0.75}>
                  <Link component={RouterLink} to="/products" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Browse Products
                  </Link>
                  <Link component={RouterLink} to="/my-products/new" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Sell Items
                  </Link>
                  <Link component={RouterLink} to="/products" color="inherit" underline="hover" 
                    sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Rent Items
                  </Link>
                </Stack>
              </Box>

              {/* Support Column */}
              <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', sm: '30%', md: 'auto' } }}>
                <Typography variant="subtitle2" fontWeight="bold"
                  sx={{ fontSize: '0.9rem', mb: 1, borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 0.5 }}>
                  Support
                </Typography>
                <Stack spacing={0.75}>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Help Center
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Safety Guidelines
                  </Link>
                  <Link href="#" color="inherit" underline="hover" sx={{ opacity: 0.9, display: 'block', py: 0.25, fontSize: '0.85rem' }}>
                    Terms of Service
                  </Link>
                </Stack>
              </Box>

              {/* Contact Info Column */}
              <Box sx={{ flex: '1 1 auto', minWidth: { xs: '100%', sm: '30%', md: 'auto' } }}>
                <Typography variant="subtitle2" fontWeight="bold"
                  sx={{ fontSize: '0.9rem', mb: 1, borderBottom: '1px solid rgba(255,255,255,0.2)', pb: 0.5 }}>
                  Contact Us
                </Typography>
                
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 16, mt: 0.2, opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium', fontSize: '0.85rem' }}>
                      +91 8340457343 / +91 7004884668
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 16, mt: 0.2, opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9, wordBreak: 'break-all', fontWeight: 'medium', fontSize: '0.85rem' }}>
                      22052461@kiit.ac.in / 22052443@kiit.ac.in
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <LocationOnIcon sx={{ mr: 1, fontSize: 16, mt: 0.2, opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium', lineHeight: 1.4, fontSize: '0.85rem' }}>
                      KIIT University, Bhubaneswar, Odisha 751024, India
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 2, md: 2.5 }, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' }, 
          gap: 1,
          py: 0.5
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8, textAlign: { xs: 'center', sm: 'left' }, fontSize: '0.8rem' }}>
            © {currentYear} KIIT Rentals. All rights reserved.
          </Typography>
          <Stack 
            direction="row" 
            spacing={{ xs: 2, md: 3 }} 
            divider={<Box component="span" sx={{ opacity: 0.3 }}>•</Box>}
            justifyContent={{ xs: 'center', sm: 'flex-end' }} 
            width={{ xs: '100%', sm: 'auto' }}
          >
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
              Terms
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
              Privacy
            </Link>
            <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
              Cookies
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 