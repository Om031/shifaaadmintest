import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  Button,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setMainProduct } from '../../store/Products/ProductsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const ModernProductShowcase = ({ products }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(products.length > 3);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    updateArrows();
  }, [products]);

  const updateArrows = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(updateArrows, 300);
    }
  };

  const selectMainProduct = (product) => {
    dispatch(setMainProduct(product));
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              منتجاتنا المتميزة
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '1.125rem',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              اكتشف مجموعتنا المختارة بعناية من منتجات الصحة الطبيعية، 
              المصممة لتعزيز رفاهيتك وتقربك من الطبيعة.
            </Typography>
          </Box>
        </motion.div>

        {/* Product Carousel */}
        <Box sx={{ position: 'relative' }}>
          {/* Left Arrow */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={() => scroll('left')}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Scroll Container */}
          <Box
            ref={scrollContainerRef}
            onScroll={updateArrows}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              px: { xs: 2, md: 4 },
              pb: 2,
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ minWidth: 320 }}
              >
                <Card
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => selectMainProduct(product)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredProduct === product._id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    '&:hover': {
                      boxShadow: `0 20px 40px ${theme.palette.primary.main}30`,
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative', p: 2 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image2}
                      alt={product.name}
                      sx={{
                        objectFit: 'contain',
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }}
                    />
                    
                    {/* Floating Badges */}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                      }}
                    >
                      <Chip
                        label="طبيعي"
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.primary.main}20`,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        icon={<StarIcon sx={{ fontSize: '0.75rem' }} />}
                        label="4.9"
                        size="small"
                        sx={{
                          backgroundColor: `${theme.palette.warning.main}20`,
                          color: theme.palette.warning.main,
                          fontWeight: 600,
                        }}
                      />
                    </Stack>

                    {/* Favorite Button */}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: theme.palette.error.main,
                          color: theme.palette.error.contrastText,
                        },
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  {/* Product Content */}
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        flex: 1,
                        lineHeight: 1.5,
                      }}
                    >
                      {product.description || 'منتج صحي طبيعي متميز مصمم لرفاهيتك.'}
                    </Typography>

                    {/* Price and Action */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography
                        variant="h5"
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                        }}
                      >
                        ₪{product.price?.toFixed(2) || '99.99'}
                      </Typography>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Right Arrow */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={() => scroll('right')}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              عرض جميع المنتجات
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ModernProductShowcase;
