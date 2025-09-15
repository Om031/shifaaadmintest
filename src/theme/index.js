import { createTheme } from '@mui/material/styles';
import { arSA, heIL, enUS } from '@mui/material/locale';

// Modern color palette inspired by gravnix.com and modern e-commerce
const colors = {
  primary: {
    main: '#10b981', // Modern emerald green
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#6366f1', // Modern indigo
    light: '#818cf8',
    dark: '#4f46e5',
    contrastText: '#ffffff',
  },
  background: {
    default: '#0a0a0a', // Very dark background
    paper: '#111111', // Slightly lighter for cards
    elevated: '#1a1a1a', // For elevated elements
  },
  text: {
    primary: '#ffffff',
    secondary: '#a3a3a3',
    muted: '#737373',
  },
  success: {
    main: '#10b981',
  },
  warning: {
    main: '#f59e0b',
  },
  error: {
    main: '#ef4444',
  },
  divider: 'rgba(255, 255, 255, 0.1)',
};

// Create the modern theme
export const createAppTheme = (locale = 'ar') => {
  const localeMap = {
    ar: arSA,
    he: heIL,
    en: enUS,
  };

  return createTheme({
    direction: locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr',
    palette: {
      mode: 'dark',
      ...colors,
    },
    typography: {
      fontFamily: [
        'Inter',
        'Tajawal',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        fontWeight: 400,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
                shadows: [
                  'none',
                  '0px 1px 2px rgba(0, 0, 0, 0.4)',
                  '0px 2px 4px rgba(0, 0, 0, 0.4)',
                  '0px 4px 8px rgba(0, 0, 0, 0.4)',
                  '0px 8px 16px rgba(0, 0, 0, 0.4)',
                  '0px 16px 32px rgba(0, 0, 0, 0.4)',
                  '0px 32px 64px rgba(0, 0, 0, 0.4)',
                  '0px 64px 128px rgba(0, 0, 0, 0.4)',
                  '0px 128px 256px rgba(0, 0, 0, 0.4)',
                  '0px 256px 512px rgba(0, 0, 0, 0.4)',
                  '0px 512px 1024px rgba(0, 0, 0, 0.4)',
                  '0px 1024px 2048px rgba(0, 0, 0, 0.4)',
                  '0px 2048px 4096px rgba(0, 0, 0, 0.4)',
                  '0px 4096px 8192px rgba(0, 0, 0, 0.4)',
                  '0px 8192px 16384px rgba(0, 0, 0, 0.4)',
                  '0px 16384px 32768px rgba(0, 0, 0, 0.4)',
                  '0px 32768px 65536px rgba(0, 0, 0, 0.4)',
                  '0px 65536px 131072px rgba(0, 0, 0, 0.4)',
                  '0px 131072px 262144px rgba(0, 0, 0, 0.4)',
                  '0px 262144px 524288px rgba(0, 0, 0, 0.4)',
                  '0px 524288px 1048576px rgba(0, 0, 0, 0.4)',
                  '0px 1048576px 2097152px rgba(0, 0, 0, 0.4)',
                  '0px 2097152px 4194304px rgba(0, 0, 0, 0.4)',
                  '0px 4194304px 8388608px rgba(0, 0, 0, 0.4)',
                ],
    components: {
                  MuiButton: {
                    styleOverrides: {
                      root: {
                        textTransform: 'none',
                        fontWeight: 600,
                        borderRadius: '50px',
                        padding: '12px 24px',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      },
                      contained: {
                        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                        '&:hover': {
                          boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4)',
                        },
                      },
                      outlined: {
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)',
                        },
                      },
                    },
                  },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: colors.background.paper,
            border: `1px solid ${colors.divider}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: colors.background.elevated,
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary.main,
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.divider}`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.background.paper,
            borderLeft: `1px solid ${colors.divider}`,
            backdropFilter: 'blur(20px)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
    },
  }, localeMap[locale] || arSA);
};

export default createAppTheme;
