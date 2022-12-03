import React from 'react';
import { ThemeProvider } from "styled-components";
import Footer from '../Componets/Footer';
import Header from '../Componets/Header';
import TypingBox from '../Componets/TypingBox';
import { useTheme } from '../Context/ThemeContext';
import { GlobalStyle } from '../Styles/global';
// import { auth } from "./firebaseConfig";

const HomePage = () => {
    const {theme}= useTheme();

  return (
    <ThemeProvider theme={theme}>

    <div className="canvas">
      <GlobalStyle/>
     {/* <h1 style={{"textAlign":"center"}}> Typing Test</h1> */}
     <Header/>
     <TypingBox />
     <Footer/>
     {/* <h1 style={{"textAlign":"center"}}> Footer</h1>  */}
    </div>
   </ThemeProvider>
  )
}

export default HomePage