import React, { createContext, useEffect, useState } from 'react'

// Create a context for managing the theme
export const ThemeContext = createContext(null);

// ThemeProvider component manages the theme state and provides it to its children
const ThemeProvider = ({ children }) => {

    // State to manage the current theme
    const [isDark, setIsDark] = useState(false);

    // Use effect to set the theme based on the stored value in local storage
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        setIsDark(storedTheme === 'dark')
    }, []);

    // Provide the theme state and setter to the children through the context
    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider