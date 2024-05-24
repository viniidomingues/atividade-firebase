// ThemeContext.tsx
import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

const lightTheme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonColor: '#6200ee',
};

const darkTheme = {
  backgroundColor: '#000000',
  textColor: '#ffffff',
  buttonColor: '#bb86fc',
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
