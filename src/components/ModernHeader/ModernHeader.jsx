import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme as useCustomTheme } from '../../theme/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../SearchBar/SearchBar';
import { useSelector } from 'react-redux';

const ModernHeader = ({ products = [], onCartClick }) => {
  const { t, i18n, ready } = useTranslation();
  const { locale, changeLocale } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeMenu, setActiveMenu] = useState('homePage');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Get cart count from Redux store
  const rootState = useSelector((state) => state);
  const cartCount = rootState?.cart?.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const menuItems = [
    { 
      id: 'homePage', 
      label: i18n.language === 'ar' ? 'الصفحة الرئيسية' : 
             i18n.language === 'he' ? 'דף הבית' : 
             'Home Page' 
    },
    { 
      id: 'aboutUs', 
      label: i18n.language === 'ar' ? 'نبذة عنا' : 
             i18n.language === 'he' ? 'עלינו' : 
             'About Us' 
    },
    { 
      id: 'articles', 
      label: i18n.language === 'ar' ? 'مقالات' : 
             i18n.language === 'he' ? 'מאמרים' : 
             'Articles' 
    },
    { 
      id: 'faq', 
      label: i18n.language === 'ar' ? 'الأسئلة المتكررة' : 
             i18n.language === 'he' ? 'שאלות נפוצות' : 
             'FAQ' 
    },
    { 
      id: 'contactUs', 
      label: i18n.language === 'ar' ? 'تواصل معنا' : 
             i18n.language === 'he' ? 'צור קשר' : 
             'Contact Us' 
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveMenu(sectionId);
      setMobileOpen(false);
    }
  };

  const handleLanguageChange = () => {
    const newLocale = locale === 'ar' ? 'en' : locale === 'en' ? 'he' : 'ar';
    changeLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };

  useEffect(() => {
    const sections = ['homePage', 'aboutUs', 'articles', 'faq', 'contactUs'];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveMenu(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const drawer = (
    <Box sx={{ 
      width: { xs: '100vw', sm: 280 }, 
      height: '100%', 
      backgroundColor: theme.palette.background.paper,
      maxWidth: '100%',
    }}>
      <Box sx={{ 
        p: { xs: 2, sm: 3 }, 
        textAlign: 'center', 
        borderBottom: `1px solid ${theme.palette.divider}` 
      }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
              S
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Shifaa
          </Typography>
        </motion.div>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(item.id)}
                sx={{
                  mx: 2,
                  borderRadius: 2,
                  backgroundColor: activeMenu === item.id ? theme.palette.primary.main : 'transparent',
                  '&:hover': {
                    backgroundColor: activeMenu === item.id ? theme.palette.primary.dark : theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: activeMenu === item.id ? theme.palette.primary.contrastText : theme.palette.text.primary,
                    textAlign: theme.direction === 'rtl' ? 'right' : 'left',
                    fontWeight: activeMenu === item.id ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{
            backgroundColor: scrolled 
              ? 'rgba(10, 10, 10, 0.98)' 
              : 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(24px)',
            borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          }}
        >
          <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
            <Toolbar sx={{ 
              justifyContent: 'space-between', 
              py: { xs: 0.5, sm: 1 },
              minHeight: { xs: 56, sm: 64 },
            }}>
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                  <Box
                    sx={{
                      width: { xs: 32, sm: 40 },
                      height: { xs: 32, sm: 40 },
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: theme.palette.primary.contrastText, 
                        fontWeight: 'bold',
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      S
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 800,
                      display: { xs: 'none', sm: 'block' },
                      fontSize: { sm: '1.5rem', md: '1.75rem' },
                    }}
                  >
                    Shifaa
                  </Typography>
                </Box>
              </motion.div>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 1, flex: 1, justifyContent: 'center' }}>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      <Button
                        onClick={() => scrollToSection(item.id)}
                        sx={{
                          color: activeMenu === item.id ? theme.palette.primary.main : theme.palette.text.primary,
                          fontWeight: activeMenu === item.id ? 600 : 400,
                          position: 'relative',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(16, 185, 129, 0.08)',
                            transform: 'translateY(-1px)',
                          },
                          '&::after': activeMenu === item.id ? {
                            content: '""',
                            position: 'absolute',
                            bottom: -2,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 24,
                            height: 2,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 1,
                          } : {},
                        }}
                      >
                        {item.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              )}

              {/* Search Bar */}
              {!isMobile && (
                <Box sx={{ flex: 1, maxWidth: 300, mx: 2 }}>
                  <SearchBar products={products} />
                </Box>
              )}

              {/* Right Side Actions */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.5, sm: 1 },
                flexShrink: 0,
              }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    onClick={handleLanguageChange}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <LanguageIcon />
                  </IconButton>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
                      },
                    }}
                  >
                    <IconButton
                      onClick={onCartClick}
                      sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  </Badge>
                </motion.div>

                {/* Mobile Search */}
                {isMobile && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Box sx={{ maxWidth: 200, mx: 1 }}>
                      <SearchBar products={products} />
                    </Box>
                  </motion.div>
                )}

                {isMobile && (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      edge="end"
                      onClick={() => setMobileOpen(true)}
                      sx={{
                        color: theme.palette.text.primary,
                        '&:hover': {
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </motion.div>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Mobile Drawer */}
      <Drawer
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: theme.direction === 'rtl' ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: theme.direction === 'rtl' ? 300 : -300 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {drawer}
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  );
};

export default ModernHeader;
