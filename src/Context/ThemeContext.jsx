import { useState,createContext, useContext } from "react";
import { themeOption } from "../Styles/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const defaultTheme =JSON.parse(localStorage.getItem('theme')) || themeOption[0].value;
  const [theme, settheme] = useState(defaultTheme);
  const values = {
    theme,
    settheme,
    defaultTheme
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = ()=> useContext(ThemeContext);
