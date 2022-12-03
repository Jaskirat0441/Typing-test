import React from 'react'
import Select from 'react-select';
// import { useTheme } from 'styled-components';
import { themeOption } from '../Styles/theme';
import { useTheme } from "../Context/ThemeContext";


const Footer = () => {

    const {settheme,theme,defaultTheme} = useTheme();

    const handleThemeChange =(e)=> {

        settheme(e.value);
        localStorage.setItem('theme',JSON.stringify(e.value));

    }

  return (
    <div className='footer'>
        <div className="footer-links">

        </div>
        <div className="theme_options">
            <Select 
            options={themeOption}
            onChange={handleThemeChange}
            menuPlacement='top'
            defaultValue={{value:defaultTheme,label:defaultTheme.label}}
            styles={{
              control: (styles)=>({...styles,backgroundColor:theme.background}),
              menu: (styles)=>({...styles,backgroundColor: theme.background})
          }}
            />
        </div>
    </div>
  )
}

export default Footer