// ThemeContext.tsx
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

const lightTheme = {
  backgroundColorFull: '#5d5555',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#6200ee',
  headerColor: '#008080'
};

const darkTheme = {
  backgroundColorFull:'#ded4d4',
  backgroundColor: '#000000',
  textColor: '#ffffff',
  buttonColor: '#bb86fc',
  headerColor: '#000000'
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  themeStyles: typeof lightTheme;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextProps = {
  theme: 'light',
  themeStyles: lightTheme,
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeContext);

export const ThemeProviderContext: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
