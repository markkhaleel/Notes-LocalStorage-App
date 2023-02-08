import React, { createContext, useContext, useState } from 'react'
import { lightTheme, darkTheme } from '../misc/ThemeStyles'

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(lightTheme)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme }

