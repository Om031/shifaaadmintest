import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ModernFooter = ({ id }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/shifaa.online/', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com/profile.php?id=61568774203434', '_blank');
  };

  const menuItems = [
    { id: 'homePage', label: 'footer.homePage', fallback: 'الصفحة الرئيسية' },
    { id: 'aboutUs', label: 'footer.aboutUs', fallback: 'من نحن' },
    { id: 'articles', label: 'footer.articles', fallback: 'المقالات' },
    { id: 'faq', label: 'footer.faq', fallback: 'الأسئلة المتكررة' },
    { id: 'contactUs', label: 'footer.contactUs', fallback: 'تواصل معنا' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, label: 'Facebook', onClick: openFacebook, color: '#1877F2' },
    { icon: <InstagramIcon />, label: 'Instagram', onClick: openInstagram, color: '#E4405F' },
    { icon: <WhatsAppIcon />, label: 'WhatsApp', onClick: () => window.open('https://wa.me/972512551008', '_blank'), color: '#62cc90' },
  ];

  return (
    <Box
      id={id}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 70%, ${theme.palette.primary.main}10 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Main Footer Content */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      background: 'linear-gradient(135deg, #62cc90, #7dd4a3)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(98, 204, 144, 0.3)',
                    }}
                  >
                    <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                      S
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#62cc90',
                      fontWeight: 800,
                    }}
                  >
                    Shifaa
                  </Typography>
                </Stack>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#b8b8b8',
                    lineHeight: 1.7,
                    mb: 3,
                    maxWidth: 300,
                    textAlign: 'right',
                    direction: 'rtl',
                  }}
                >
                  منتجات الشفاء الطبيعي لحياة أكثر صحة. جسمك أمانة، 
                  ونحن هنا لحمايته بحلول عضوية متميزة.
                </Typography>

                {/* Social Links */}
                <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IconButton
                        onClick={social.onClick}
                        sx={{
                          backgroundColor: `${social.color}20`,
                          color: social.color,
                          '&:hover': {
                            backgroundColor: social.color,
                            color: '#ffffff',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 3,
                    textAlign: 'right',
                    direction: 'rtl',
                  }}
                >
                  روابط سريعة
                </Typography>
                
                <Stack spacing={2} sx={{ alignItems: 'flex-end' }}>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        component="button"
                        onClick={() => scrollToSection(item.id)}
                        sx={{
                          color: '#b8b8b8',
                          textDecoration: 'none',
                          textAlign: 'right',
                          fontSize: '1rem',
                          display: 'block',
                          width: '100%',
                          padding: '8px 0',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#62cc90',
                            transform: 'translateX(-5px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {i18n.options.resources[i18n.language]?.footer?.[item.label.split('.')[1]] || item.fallback || item.label}
                      </Link>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 600,
                    mb: 3,
                    textAlign: 'right',
                    direction: 'rtl',
                  }}
                >
                  اتصل بنا
                </Typography>
                
                <Stack spacing={3}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgba(98, 204, 144, 0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <EmailIcon sx={{ color: '#62cc90' }} />
                      </Box>
                      <Box sx={{ textAlign: 'right', direction: 'rtl' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b8b8b8',
                            fontSize: '0.875rem',
                          }}
                        >
                          البريد الإلكتروني
                        </Typography>
                        <Link
                          href="mailto:support@shifaa2.com"
                          sx={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              color: '#62cc90',
                            },
                          }}
                        >
                          support@shifaa2.com
                        </Link>
                      </Box>
                    </Stack>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: 'rgba(98, 204, 144, 0.2)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PhoneIcon sx={{ color: '#62cc90' }} />
                      </Box>
                      <Box sx={{ textAlign: 'right', direction: 'rtl' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b8b8b8',
                            fontSize: '0.875rem',
                          }}
                        >
                          الهاتف
                        </Typography>
                        <Link
                          href="tel:+972512551008"
                          sx={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              color: '#62cc90',
                            },
                          }}
                        >
                          +972-51-255-1008
                        </Link>
                      </Box>
                    </Stack>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: '#333333' }} />

        {/* Bottom Footer */}
        <Box sx={{ py: 3 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#b8b8b8',
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                © 2024 شفاء. جميع الحقوق محفوظة.
              </Typography>
            </motion.div>

            {/* Legal Links */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <Link
                  component="button"
                  onClick={() => navigate('/policy-privacy')}
                  sx={{
                    color: '#b8b8b8',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#62cc90',
                    },
                  }}
                >
                  سياسة الخصوصية
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Link
                  component="button"
                  onClick={() => navigate('/policy')}
                  sx={{
                    color: '#b8b8b8',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#62cc90',
                    },
                  }}
                >
                  شروط الخدمة
                </Link>
              </motion.div>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ModernFooter;
