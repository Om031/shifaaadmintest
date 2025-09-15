import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EidLottieAnimations from './EidLottieAnimations';
import { styled } from '@mui/material/styles';

const ResponsiveDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #A9D15A, #4CBC8F)',
    overflow: 'hidden',
    margin: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    position: 'relative',
    '@media (max-width: 600px)': {
      margin: '8px',
      width: '95%',
      maxHeight: '95vh',
    },
    '@media (max-width: 400px)': {
      margin: '4px',
      width: '98%',
      maxHeight: '98vh',
    }
  }
}));

const ResponsiveContent = styled('div')({
  padding: '2rem',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    padding: '1.5rem',
  },
  '@media (max-width: 400px)': {
    padding: '1rem',
  }
});

const EidTitle = styled('h1')({
  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  marginBottom: '0.5rem',
  color: '#ffffff',
  fontFamily: 'Amiri, serif',
  fontWeight: 'bold',
  lineHeight: 1.2,
  textAlign: 'center',
  '@media (max-width: 600px)': {
    marginBottom: '0.5rem',
    fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
  }
});

const EidMessage = styled('p')({
  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
  marginBottom: '1.5rem',
  color: '#ffffff',
  '@media (max-width: 600px)': {
    marginBottom: '1rem',
  }
});

const DiscountSection = styled('div')({
  margin: '1rem 0',
  width: '100%',
  '@media (max-width: 600px)': {
    margin: '0.75rem 0',
  }
});

const DiscountText = styled('p')({
  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
  color: '#ffffff',
  marginBottom: '0.5rem'
});

const DiscountAmount = styled('div')({
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0.5rem 0',
  lineHeight: 1,
  '@media (max-width: 600px)': {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
  }
});

const DiscountDetails = styled('p')({
  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
  color: '#ffffff',
  marginBottom: '0.25rem',
  lineHeight: 1.3,
  textAlign: 'center',
  '@media (max-width: 600px)': {
    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
  }
});

const StoreButton = styled('button')({
  backgroundColor: '#ffffff',
  color: '#4CBC8F',
  border: 'none',
  borderRadius: '25px',
  padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 3vw, 2rem)',
  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '0.5rem',
  maxWidth: '200px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#f0f0f0',
    transform: 'scale(1.05)'
  },
  '@media (max-width: 600px)': {
    padding: 'clamp(0.5rem, 1.2vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem)',
    fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
  }
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: '8px',
  top: '8px',
  color: '#ffffff',
  '@media (max-width: 600px)': {
    padding: '8px',
  }
});

export default function EidPopup({ open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStoreClick = async () => {
    try {
      // const response = await validateCoupon({ couponCode: 'Eid20' });
      // if (response?.discount > 0) {
      //   dispatch(setCouponCode('Eid20'));
      //   dispatch(setCouponDiscount(response?.discount));
      // }
      onClose();
    } catch (err) {
      console.error('Error applying coupon:', err);
      onClose();
    }
  };

  return (
    <>
      {/* <RamadanHeader show={open} /> */}
      <ResponsiveDialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <CloseButton aria-label="close" onClick={handleStoreClick}>
          <CloseIcon />
        </CloseButton>
        <DialogContent>
          <ResponsiveContent>
            <EidLottieAnimations />
            <EidTitle>عرض خاص</EidTitle>
            {/* <EidMessage>خصم 25% </EidMessage> */}
            <DiscountSection>
              <DiscountText>عرض مميز</DiscountText>
              <DiscountAmount>25%</DiscountAmount>
              <DiscountDetails>على Rashaqa for Life لفترة محدودة.</DiscountDetails>
              <DiscountDetails>تحكم بشهيتك وعيش صيفك بخفة!</DiscountDetails>
              <DiscountDetails>خصم تلقائي عند الشراء</DiscountDetails>
            </DiscountSection>
            <StoreButton onClick={handleStoreClick}>
              تسوق الآن
            </StoreButton>
          </ResponsiveContent>
        </DialogContent>
      </ResponsiveDialog>
    </>
  );
} 