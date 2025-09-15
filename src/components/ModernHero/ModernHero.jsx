import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Chip,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Star as StarIcon,
  LocalShipping as ShippingIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/cart/CartSlice';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ModernHero = ({ setOpenDrawer }) => {
  const rootState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t, i18n, ready } = useTranslation();
  const theme = useTheme();

  // Force re-render when language changes
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [i18n.language]);

  // Show loading if translations are not ready
  if (!ready) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography>Loading translations...</Typography>
      </Box>
    );
  }

  const handleAddToCart = (isNow) => {
    if (isNow) {
      dispatch(addProduct(rootState.product.mainProduct._id));
      setOpenDrawer(true);
    } else {
      dispatch(addProduct(rootState.product.mainProduct._id));
    }
  };

  const features = [
    { 
      icon: <VerifiedIcon />, 
      label: i18n.language === 'ar' ? 'مكونات طبيعية 100%' : 
             i18n.language === 'he' ? '100% רכיבים טבעיים' : 
             '100% Natural Ingredients', 
      color: theme.palette.success.main 
    },
    { 
      icon: <ShippingIcon />, 
      label: i18n.language === 'ar' ? 'توصيل سريع' : 
             i18n.language === 'he' ? 'משלוח מהיר' : 
             'Fast Delivery', 
      color: theme.palette.info.main 
    },
    { 
      icon: <StarIcon />, 
      label: i18n.language === 'ar' ? 'جودة عالية' : 
             i18n.language === 'he' ? 'איכות גבוהה' : 
             'High Quality', 
      color: theme.palette.warning.main 
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 6 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.primary.main}15 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${theme.palette.secondary.main}10 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 100,
          height: 100,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.primary.light}20)`,
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: 150,
          height: 150,
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.secondary.light}20)`,
          borderRadius: '50%',
          filter: 'blur(30px)',
        }}
      />

      <Container 
        maxWidth="lg"
        sx={{
          px: { xs: 1, sm: 2 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 3, sm: 4, lg: 8 },
            alignItems: 'center',
            minHeight: { xs: 'auto', lg: '80vh' },
            width: '100%',
          }}
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Stack spacing={4}>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Chip
                  icon={<VerifiedIcon />}
                  label={i18n.language === 'ar' ? 'طبيعي وعضوي 100%' : 
                         i18n.language === 'he' ? '100% טבעי ואורגני' : 
                         '100% Natural & Organic'}
                  sx={{
                    backgroundColor: `${theme.palette.primary.main}20`,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                />
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: { xs: 1, sm: 2 },
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                  }}
                >
                  {i18n.language === 'ar' ? 'كل خطوة أقرب إلى الطبيعة' : 
                   i18n.language === 'he' ? 'כל צעד קרוב יותר לטבע' : 
                   'Every step closer to nature'}
                </Typography>
              </motion.div>

              {/* Sub Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.5rem', lg: '3rem' },
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  {i18n.language === 'ar' ? 'هي خطوة نحو الشفاء' : 
                   i18n.language === 'he' ? 'הוא צעד לקראת ריפוי' : 
                   'is a step towards healing'}
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem' },
                    lineHeight: 1.6,
                    mb: { xs: 3, sm: 4 },
                    maxWidth: { xs: '100%', sm: 500 },
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                  }}
                >
                  {i18n.language === 'ar' ? 'اكتشف قوة الشفاء الطبيعي مع منتجاتنا العضوية المتميزة. كل خطوة أقرب إلى الطبيعة هي خطوة نحو الشفاء.' : 
                   i18n.language === 'he' ? 'גלה את כוח הריפוי הטבעי עם המוצרים האורגניים המובחרים שלנו. כל צעד קרוב יותר לטבע הוא צעד לקראת ריפוי.' : 
                   'Discover the power of natural healing with our premium organic products. Every step closer to nature is a step towards healing.'}
                </Typography>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    >
                      <Chip
                        icon={feature.icon}
                        label={feature.label}
                        sx={{
                          backgroundColor: `${feature.color}20`,
                          color: feature.color,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 2, sm: 3 }}
                  sx={{ mt: { xs: 3, sm: 4, md: 5 } }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(true)}
                      sx={{
                        py: { xs: 2, sm: 2.5 },
                        px: { xs: 4, sm: 5 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 700,
                        borderRadius: '50px',
                        textTransform: 'none',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
                        border: 'none',
                        minWidth: { xs: '100%', sm: 200 },
                        height: { xs: 48, sm: 56 },
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          boxShadow: `0 12px 40px ${theme.palette.primary.main}60`,
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                    >
                      {i18n.language === 'ar' ? 'الشراء الان' : 
                       i18n.language === 'he' ? 'קנה עכשיו' : 
                       'Buy Now'}
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(false)}
                      sx={{
                        py: { xs: 2, sm: 2.5 },
                        px: { xs: 4, sm: 5 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        fontWeight: 700,
                        borderRadius: '50px',
                        textTransform: 'none',
                        borderWidth: 2,
                        borderColor: theme.palette.text.primary,
                        color: theme.palette.text.primary,
                        backgroundColor: 'transparent',
                        minWidth: { xs: '100%', sm: 200 },
                        height: { xs: 48, sm: 56 },
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          backgroundColor: `${theme.palette.primary.main}15`,
                          boxShadow: `0 8px 32px ${theme.palette.primary.main}30`,
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          transform: 'translateY(0px)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}10)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        },
                      }}
                    >
                      {i18n.language === 'ar' ? 'اضافة لسلة الشراء' : 
                       i18n.language === 'he' ? 'הוסף לעגלה' : 
                       'Add to Cart'}
                    </Button>
                  </motion.div>
                </Stack>
              </motion.div>
            </Stack>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, sm: 320, md: 400 },
                height: { xs: 280, sm: 320, md: 400 },
                maxWidth: '100%',
                overflow: 'hidden',
              }}
            >
              {/* Product Image */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={rootState.product.mainProduct?.image2}
                  alt="Product"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '10%',
                  right: '10%',
                }}
              >
                <Chip
                  label={i18n.language === 'ar' ? 'الأكثر مبيعاً' : 
                         i18n.language === 'he' ? 'הנמכר ביותר' : 
                         'Best Seller'}
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    color: theme.palette.warning.contrastText,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ModernHero;
