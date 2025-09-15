import React from 'react';
import { styled, keyframes } from '@mui/material/styles';

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutToTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const HeaderImage = styled('img')(({ show }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: '100vw',
  height: '550px',
  objectFit: 'cover',
  zIndex: 1000,
  pointerEvents: 'none',
  animation: show 
    ? `${slideInFromTop} 1s ease-out forwards`
    : `${slideOutToTop} 1s ease-out forwards`,
  '@media (max-width: 1200px)': {
    height: '450px',
  },
  '@media (max-width: 900px)': {
    height: '350px',
  },
  '@media (max-width: 600px)': {
    height: '250px',
  },
  '@media (max-width: 400px)': {
    height: '200px',
  }
}));

const RamadanHeader = ({ show }) => {
  return <HeaderImage show={show} src={require('../../assets/images/a.png')} alt="Ramadan decoration" />;
};

export default RamadanHeader; 