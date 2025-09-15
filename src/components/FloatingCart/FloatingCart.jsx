import React, { useState, useEffect } from 'react';
import {
  Fab,
  Badge,
  useTheme,
  useMediaQuery,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCart = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const rootState = useSelector((state) => state);
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const totalItems = rootState?.cart?.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    if (totalItems !== cartCount) {
      setIsAnimating(true);
      setCartCount(totalItems);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [rootState?.cart?.cart, cartCount]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <Tooltip 
        title={cartCount > 0 ? `${cartCount} عنصر في السلة` : 'السلة فارغة'} 
        placement="left"
        arrow
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Fab
            onClick={onClick}
            sx={{
              width: 64,
              height: 64,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <AnimatePresence mode="wait">
              {cartCount > 0 ? (
                <motion.div
                  key="cart"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCartIcon sx={{ color: theme.palette.primary.contrastText }} />
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <AddIcon sx={{ color: theme.palette.primary.contrastText }} />
                </motion.div>
              )}
            </AnimatePresence>
          </Fab>
        </motion.div>
      </Tooltip>

      {/* Cart Count Badge */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
            }}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  minWidth: 20,
                  height: 20,
                  borderRadius: '50%',
                  animation: isAnimating ? 'pulse 0.3s ease-in-out' : 'none',
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </motion.div>
  );
};

export default FloatingCart;
