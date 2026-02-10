import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  Chip,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  AttachMoney,
  Speed,
  Inventory,
  LocalOffer,
  Security,
  SupportAgent
} from '@mui/icons-material';
import './LandingPage.css';

function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: '10-15 Min Delivery',
      description: 'Lightning-fast delivery to your doorstep'
    },
    {
      icon: <Inventory sx={{ fontSize: 40 }} />,
      title: '70+ Products',
      description: 'Fresh groceries and daily essentials'
    },
    {
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      title: 'Best Prices',
      description: 'Competitive prices on all products'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Free Delivery',
      description: 'No delivery charges on all orders'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Payments',
      description: 'Safe and encrypted transactions'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Always here to help you'
    }
  ];

  const categories = [
    { name: 'Fruits & Vegetables', emoji: '🥬', count: '15+' },
    { name: 'Dairy Products', emoji: '🥛', count: '10+' },
    { name: 'Snacks & Beverages', emoji: '🍿', count: '20+' },
    { name: 'Personal Care', emoji: '🧴', count: '12+' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Modern Navigation */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <ShoppingCart sx={{ fontSize: 32, color: '#2c5aa0', mr: 1 }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#2c5aa0',
                letterSpacing: '-0.5px'
              }}
            >
              QuickMart
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button 
              component={Link} 
              to="/login"
              variant="outlined"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register"
              variant="contained"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: '#2c5aa0',
                '&:hover': {
                  bgcolor: '#1e3a70'
                }
              }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip 
                label="🚀 Fast & Fresh Delivery" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  mb: 2
                }}
              />
              <Typography 
                variant={isMobile ? 'h3' : 'h2'} 
                sx={{ 
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Fresh Groceries
                <br />
                Delivered in Minutes
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400
                }}
              >
                Get fresh groceries and daily essentials delivered to your doorstep in just 10-15 minutes.
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Button 
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{ 
                    bgcolor: 'white',
                    color: '#667eea',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: '#f0f0f0'
                    }
                  }}
                >
                  Start Shopping
                </Button>
                <Button 
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{ 
                    borderColor: 'white',
                    color: 'white',
                    borderRadius: '12px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>

              <Stack direction="row" spacing={3} flexWrap="wrap">
                {[
                  { icon: '⚡', text: '10-15 Min' },
                  { icon: '🛒', text: '70+ Products' },
                  { icon: '💰', text: 'Best Prices' },
                  { icon: '🚚', text: 'Free Delivery' }
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5">{item.icon}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: 400,
                    borderRadius: '24px',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '120px'
                  }}
                >
                  🛒
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: '#1a1a1a'
            }}
          >
            Why Choose QuickMart?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              fontWeight: 400
            }}
          >
            Experience the best grocery shopping with our amazing features
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  borderRadius: '16px',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box 
                    sx={{ 
                      width: 64,
                      height: 64,
                      borderRadius: '12px',
                      bgcolor: '#f0f4ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: '#2c5aa0'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: '#1a1a1a'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: '#1a1a1a'
              }}
            >
              Shop by Category
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666',
                fontWeight: 400
              }}
            >
              Browse through our wide range of products
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '16px',
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Typography variant="h1" sx={{ mb: 1 }}>
                    {category.emoji}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 0.5,
                      color: '#1a1a1a'
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Chip 
                    label={category.count}
                    size="small"
                    sx={{ 
                      bgcolor: '#f0f4ff',
                      color: '#2c5aa0',
                      fontWeight: 600
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 2
              }}
            >
              Ready to Start Shopping?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                opacity: 0.9
              }}
            >
              Join thousands of happy customers and get your groceries delivered in minutes!
            </Typography>
            <Button 
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              sx={{ 
                bgcolor: 'white',
                color: '#667eea',
                borderRadius: '12px',
                px: 6,
                py: 2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: '#f0f0f0'
                }
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: '#1a1a1a',
          color: 'white',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <ShoppingCart sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                QuickMart
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 QuickMart - Fresh Groceries Delivered in Minutes
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
