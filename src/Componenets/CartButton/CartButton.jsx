import React from 'react';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { styled, keyframes } from '@mui/material/styles';
import { useSelector } from 'react-redux';

// Define animations
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// Create a styled Fab using your accent colors
const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: '#62cc90',
  color: '#1c1c1c',
  '&:hover': {
    backgroundColor: '#4cbc8f',
  },
}));

// Create a styled discount badge with animations
const DiscountBadge = styled(Badge)(({ theme }) => ({
  position: 'relative',
  '& .MuiBadge-badge': {
    backgroundColor: '#ff3b30',
    color: '#ffffff',
    fontWeight: 700,
    right: 'auto',
    left: -10,
    top: -10,
    width: 32,
    height: 32,
    borderRadius: '50%',
    animation: `${pulseAnimation} 2s infinite ease-in-out`,
    '& .MuiSvgIcon-root': {
      animation: `${rotateAnimation} 2s infinite ease-in-out`,
      fontSize: 20,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(255, 59, 48, 0.4)',
    border: '2px solid #ffffff',
    zIndex: 7301,
  },
}));

// CartFab component accepts a cartCount prop and an onClick handler
const CartFab = ({ cartCount, onClick }) => {
  const couponDiscount = useSelector(state => state.cart.couponDiscount);
  const hasCoupon = couponDiscount > 0;

  return (
    <Badge
      badgeContent={cartCount}
      sx={{
        position: 'fixed',
        bottom: 26,
        right: 26,
        zIndex: 7300,
        '& .MuiBadge-badge': {
          backgroundColor: '#4cbc8f',
          color: '#1c1c1c',
          fontWeight: 700,
          zIndex: 7301,
        },
      }}
    >
      <DiscountBadge
        badgeContent={hasCoupon ? <LocalOfferIcon /> : null}
        color="secondary"
      >
        <StyledFab onClick={onClick} sx={{ zIndex: 7300 }}>
          <ShoppingCartIcon />
        </StyledFab>
      </DiscountBadge>
    </Badge>
  );
};

export default CartFab;
