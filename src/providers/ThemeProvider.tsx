import { ReactNode, useState, createContext, useContext } from "react";

const ThemeContext = createContext({
  toggleIsDarkTheme: () => {},
  isDarkTheme: true,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const toggleIsDarkTheme = () => {
    setIsDarkTheme((prevState: boolean) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleIsDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeProvider = () => {
  const { isDarkTheme, toggleIsDarkTheme } = useContext(ThemeContext);

  return { isDarkTheme, toggleIsDarkTheme };
};
