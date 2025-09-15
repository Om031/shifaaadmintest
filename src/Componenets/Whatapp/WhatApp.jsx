import React from 'react';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Styled Floating Action Button using your accent colors
const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: '#A9D15A', // WhatsApp green
  color: '#000',
  '&:hover': {
    backgroundColor: '#128C7E',
  },
}));

const WhatsAppFab = () => {
  const handleClick = () => {
    const phoneNumber = '972512551008'; // without "+" and with country code
    //TODO WHATP MESSAGE
    const message = encodeURIComponent('hi, I Need Your Support');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <StyledFab
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 7300,
        height: 56,
        width: 56,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <WhatsAppIcon />
    </StyledFab>
  );
};

export default WhatsAppFab;
