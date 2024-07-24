import React, { useContext } from 'react'
import { IoSunnyOutline } from 'react-icons/io5'
import { MdOutlineNightlightRound } from 'react-icons/md'
import Switch from 'react-switch'
import { ThemeContext } from '../../Context/ThemeProvider'
import { ToggleContainer } from './ThemeToggleStyle'

const ThemeToggle = () => {

    // Theme context for dark/light mode
    const { isDark, setIsDark } = useContext(ThemeContext);

    // Function to toggle between dark and light mode
    const toggleTheme = (checked) => {
        setIsDark(checked);
        localStorage.setItem('theme', checked ? 'dark' : 'light');
    }
    return (
        <ToggleContainer $isDark={isDark}>
            <IoSunnyOutline size={20} />
            <Switch
                onChange={toggleTheme}
                checked={isDark}
                offColor="#ddd"
                onColor="#333"
                uncheckedIcon={false}
                checkedIcon={false}
                height={20}
                width={40}
            />
            <MdOutlineNightlightRound size={20} />
        </ToggleContainer>
    )
}

export default ThemeToggle