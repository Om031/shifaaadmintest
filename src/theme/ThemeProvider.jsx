import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from './index';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [locale, setLocale] = useState('ar'); // Default to Arabic
  const [theme, setTheme] = useState(() => createAppTheme(locale));

  // Update theme when locale changes
  useEffect(() => {
    setTheme(createAppTheme(locale));
  }, [locale]);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
  };

  const value = {
    locale,
    changeLocale,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
