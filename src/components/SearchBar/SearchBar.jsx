import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, products = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  const popularSearches = [
    'بركة للحياة',
    'رشاقة للحياة',
    'مكملات طبيعية',
    'عشبة القمح',
    'سبيرولينا',
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsOpen(false);
    
    // Add to recent searches
    if (term && !recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
    
    onSearch?.(term);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
      <TextField
        ref={searchRef}
        fullWidth
        placeholder="ابحث عن المنتجات..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.elevated,
            borderRadius: 3,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.text.secondary }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchTerm('')}
                sx={{ color: theme.palette.text.secondary }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1000,
              marginTop: 8,
            }}
          >
            <Paper
              sx={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                maxHeight: 400,
                overflow: 'auto',
              }}
            >
              {searchTerm.length === 0 ? (
                <Box sx={{ p: 2 }}>
                  {/* Popular Searches */}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    البحث الشائع
                  </Typography>
                  <List dense>
                    {popularSearches.map((search, index) => (
                      <motion.div
                        key={search}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <ListItem
                          button
                          onClick={() => handleSearch(search)}
                          sx={{
                            borderRadius: 1,
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                            },
                          }}
                        >
                          <ListItemIcon>
                            <TrendingUpIcon sx={{ fontSize: '1rem', color: theme.palette.primary.main }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={search}
                            sx={{
                              '& .MuiListItemText-primary': {
                                fontSize: '0.875rem',
                              },
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>

                  <Divider sx={{ my: 1 }} />

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        البحث الأخير
                      </Typography>
                      <List dense>
                        {recentSearches.map((search, index) => (
                          <motion.div
                            key={search}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: (index + popularSearches.length) * 0.05 }}
                          >
                            <ListItem
                              button
                              onClick={() => handleSearch(search)}
                              sx={{
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover,
                                },
                              }}
                            >
                              <ListItemIcon>
                                <HistoryIcon sx={{ fontSize: '1rem', color: theme.palette.text.secondary }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={search}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontSize: '0.875rem',
                                  },
                                }}
                              />
                            </ListItem>
                          </motion.div>
                        ))}
                      </List>
                    </>
                  )}
                </Box>
              ) : (
                <Box sx={{ p: 1 }}>
                  {filteredProducts.length > 0 ? (
                    <List dense>
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product._id || index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <ListItem
                            button
                            onClick={() => handleSearch(product.name)}
                            sx={{
                              borderRadius: 1,
                              '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                              },
                            }}
                          >
                            <ListItemIcon>
                              <SearchIcon sx={{ fontSize: '1rem', color: theme.palette.primary.main }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={product.name}
                              secondary={`₪${product.price?.toFixed(2) || '99.99'}`}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '0.875rem',
                                  fontWeight: 500,
                                },
                                '& .MuiListItemText-secondary': {
                                  fontSize: '0.75rem',
                                  color: theme.palette.primary.main,
                                },
                              }}
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                        }}
                      >
                        لا توجد نتائج لـ "{searchTerm}"
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;
