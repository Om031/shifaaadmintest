import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Stack,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addProduct, removeProduct, setResetCart } from '../../store/cart/CartSlice';
import { setMainProduct } from '../../store/Products/ProductsSlice';
import { useTranslation } from 'react-i18next';

const ModernCart = ({ onClose, onContinue }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const rootState = useSelector((state) => state);
  const cartItems = rootState.cart.cart || [];
  const products = rootState.product.products || [];

  const getProductDetails = (productId) => {
    return products.find(p => p._id === productId) || {};
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductDetails(item.productId);
      return total + (product.price || 0) * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (item, change) => {
    if (change > 0) {
      dispatch(addProduct(item.productId));
    } else if (item.quantity > 1) {
      dispatch(removeProduct(item.productId));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleViewProduct = (productId) => {
    const product = getProductDetails(productId);
    dispatch(setMainProduct(product));
    onClose?.();
  };

  const handleClearCart = () => {
    dispatch(setResetCart());
  };

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              backgroundColor: `${theme.palette.primary.main}20`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              mx: 'auto',
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              mb: 1,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {i18n.language === 'ar' ? 'سلة التسوق فارغة' :
             i18n.language === 'he' ? 'עגלת הקניות ריקה' :
             'Shopping Cart is Empty'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              textAlign: 'center',
              width: '100%',
            }}
          >
            {i18n.language === 'ar' ? 'ابدأ بإضافة المنتجات إلى سلة التسوق' :
             i18n.language === 'he' ? 'התחל להוסיף מוצרים לעגלת הקניות' :
             'Start adding products to the shopping cart'}
          </Typography>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              px: 5,
              py: 2,
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
              minWidth: 180,
              height: 48,
              mx: 'auto',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {i18n.language === 'ar' ? 'تابع التسوق' :
             i18n.language === 'he' ? 'המשך שופינג' :
             'Continue Shopping'}
          </Button>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 1, sm: 2 },
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: theme.palette.text.primary,
              fontWeight: 700,
            }}
          >
            {i18n.language === 'ar' ? 'سلة التسوق' :
             i18n.language === 'he' ? 'עגלת קניות' :
             'Shopping Cart'}
          </Typography>
          <Chip
            label={`${getTotalItems()} ${getTotalItems() === 1 ? 
              (i18n.language === 'ar' ? 'عنصر' : i18n.language === 'he' ? 'פריט' : 'item') :
              (i18n.language === 'ar' ? 'عناصر' : i18n.language === 'he' ? 'פריטים' : 'items')}`}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          />
        </Stack>
      </Box>

      {/* Cart Items */}
      <Box sx={{ flex: 1, overflow: 'auto', mb: 2, px: { xs: 0.5, sm: 1 } }}>
        <AnimatePresence>
          {cartItems.map((item, index) => {
            const product = getProductDetails(item.productId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    mb: { xs: 1.5, sm: 2 },
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={{ xs: 2, sm: 2 }} 
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                    >
                      {/* Product Image */}
                      <Box
                        sx={{
                          width: { xs: 100, sm: 120 },
                          height: { xs: 100, sm: 120 },
                          borderRadius: 2,
                          overflow: 'hidden',
                          backgroundColor: theme.palette.background.elevated,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: { xs: 'center', sm: 'auto' },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.image2 || '/placeholder-product.jpg'}
                          alt={product.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>

                      {/* Product Details */}
                      <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: { xs: 'normal', sm: 'nowrap' },
                            wordBreak: 'break-word',
                            lineHeight: 1.3,
                          }}
                        >
                          {product.name || 'منتج غير محدد'}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.875rem', sm: '0.875rem' },
                            color: theme.palette.text.secondary,
                            mb: 1,
                          }}
                        >
                          ₪{(product.price || 0).toFixed(2)}
                        </Typography>

                        {/* Quantity Controls */}
                        <Stack 
                          direction="row" 
                          alignItems="center" 
                          spacing={1}
                          justifyContent={{ xs: 'center', sm: 'flex-start' }}
                          sx={{ mt: { xs: 1, sm: 0 } }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, -1)}
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}20`,
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}30`,
                              },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              minWidth: 24,
                              textAlign: 'center',
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item, 1)}
                            sx={{
                              backgroundColor: `${theme.palette.primary.main}20`,
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}30`,
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>

                      {/* Actions */}
                      <Stack direction="column" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewProduct(item.productId)}
                          sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.primary.main}20`,
                            },
                          }}
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                        
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveItem(item.productId)}
                          sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                              backgroundColor: `${theme.palette.error.main}20`,
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>

      {/* Footer */}
      <Box>
        <Divider sx={{ mb: 2 }} />
        
        {/* Total */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
            }}
          >
            {i18n.language === 'ar' ? 'المجموع الكلي' :
             i18n.language === 'he' ? 'סה"כ' :
             'Total'}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
            }}
          >
            ₪{calculateTotal().toFixed(2)}
          </Typography>
        </Stack>

        {/* Action Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }}>
          <Button
            variant="outlined"
            onClick={handleClearCart}
            sx={{
              flex: 1,
              py: 2,
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              borderWidth: 2,
              borderColor: theme.palette.error.main,
              color: theme.palette.error.main,
              height: 48,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: `${theme.palette.error.main}15`,
                borderColor: theme.palette.error.main,
                boxShadow: `0 8px 24px ${theme.palette.error.main}30`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {i18n.language === 'ar' ? 'مسح السلة' :
             i18n.language === 'he' ? 'נקה עגלה' :
             'Clear Cart'}
          </Button>
          
          <Button
            variant="contained"
            onClick={onContinue}
            sx={{
              flex: 2,
              py: 2,
              borderRadius: '50px',
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
              height: 48,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                transform: 'translateY(-2px)',
              },
            }}
          >
            {i18n.language === 'ar' ? 'متابعة الدفع' :
             i18n.language === 'he' ? 'המשך לתשלום' :
             'Proceed to Checkout'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ModernCart;
