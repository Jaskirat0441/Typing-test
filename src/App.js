import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Footer from "./Componets/Footer";
import Header from "./Componets/Header";
import TypingBox from "./Componets/TypingBox";
import { useTheme } from "./Context/ThemeContext";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
// import { auth } from "./firebaseConfig";
import { GlobalStyle } from "./Styles/global";
// import { useTheme } from "../Context/ThemeContext";
import DynamicPage from "./Pages/DynamicPage";
import ErrorPage from "./Pages/ErrorPage";
import AlertBar from "./Componets/AlertBar";



function App() {


    const {theme}= useTheme();
    // console.log(auth);
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <AlertBar/>
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/user" element={<UserPage/>}></Route>
    {/* <Route path="/user/:id" element={<DynamicPage/>}></Route> */}
    {/* <Route path="*" element={<ErrorPage/>}></Route> */}

   </Routes>
    </ThemeProvider>

  );
}

export default App;



// styled components
// random words
