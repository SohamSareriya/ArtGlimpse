import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  CircularProgress,
  Button,
  Divider,
  Paper,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VerifiedIcon from '@mui/icons-material/Verified';
import sampleImage from "../assets/image (11).jpg";
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'visible',
  position: 'relative',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  }
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 'bold',
  padding: '0 12px',
  height: 32
}));

const ProductDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  // Sample data remains the same
  const sampleProduct = {
    "_id": id,
    "Categories": "Jewelry & Accessories",
    "Name": "Aadvika Handmade Necklace with Earring and Mangtika",
    "Description": "A beautifully handcrafted necklace set, including matching earrings and a mangtika, designed with intricate details for a traditional and elegant look.",
    "Price": 399,
    "Currency": "INR",
    "Stock": 18,
    "Images": ["https://phuljhadi.com/cdn/shop/files/0J7A9187copy_1200x.jpg?v=1703853131"],
    "Discount": true,
    "Valid_Until_Discount": "2025-06-10",
    "Percentage_Discount": 20,
    "Seller": {
      "Name_Seller": "Handmade",
      "Location_Seller": "India",
      "Rating_Seller": 4.8
    },
    "Processing_Time": "1-2 business days",
    "Shipping_Time": "3-5 business days",
    "Shipping_Cost": 149,
    "Materials_Made": ["Alloy Metal", "Kundan Stones", "Beads"],
    "Tags": ["handmade", "necklace", "jewelry", "traditional", "kundan"]
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setProduct(sampleProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const currentProduct = product || sampleProduct;
  const discountedPrice = currentProduct.Discount 
    ? currentProduct.Price - (currentProduct.Price * currentProduct.Percentage_Discount / 100)
    : currentProduct.Price;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" color="error" gutterBottom>
          Error: {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Return to Products
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt:20, mb:10, py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {currentProduct.Categories}
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {currentProduct.Name}
          </Typography>
        </Grid>

        <Grid item xs={12} md={7}>
          <ImageContainer>
            <CardMedia
              component="img"
              height="500"
              image={sampleImage}
              alt={currentProduct.Name}
              sx={{ borderRadius: 2, objectFit: 'cover' }}
            />
            {currentProduct.Discount && (
              <DiscountBadge 
                label={`${currentProduct.Percentage_Discount}% OFF`}
              />
            )}
          </ImageContainer>
        </Grid>

        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Rating 
                  value={currentProduct.Seller.Rating_Seller} 
                  precision={0.1} 
                  readOnly 
                />
                <Typography variant="body2">
                  ({currentProduct.Seller.Rating_Seller})
                </Typography>
                <Chip 
                  icon={<VerifiedIcon />} 
                  label="Verified Seller" 
                  color="primary" 
                  size="small" 
                  variant="outlined"
                />
              </Stack>
              
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {currentProduct.Seller.Location_Seller}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h4" color="secondary" gutterBottom>
                {currentProduct.Currency} {discountedPrice.toFixed(2)}
              </Typography>
              {currentProduct.Discount && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  {currentProduct.Currency} {currentProduct.Price}
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ShoppingCartIcon />}
                fullWidth
              >
                Add to Cart
              </Button>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Stack>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocalShippingIcon color="action" />
                  <Typography variant="body2">
                    Shipping: {currentProduct.Shipping_Time}
                    <Typography component="span" color="primary" fontWeight="medium">
                      {' '}({currentProduct.Currency} {currentProduct.Shipping_Cost})
                    </Typography>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="action" />
                  <Typography variant="body2">
                    Processing Time: {currentProduct.Processing_Time}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="medium">Product Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  {currentProduct.Description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>Materials:</Typography>
                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                  {currentProduct.Materials_Made.map((material, index) => (
                    <Chip 
                      key={index} 
                      label={material} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="subtitle2" gutterBottom>Tags:</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {currentProduct.Tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small" 
                      variant="outlined" 
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;