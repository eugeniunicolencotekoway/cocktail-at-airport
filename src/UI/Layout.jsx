import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import {defaultThemeValue, previousThemeStorageKey, ThemeContext} from "../Context";
import store from "../Store";

const Layout = (props) => {
  const [theme, setTheme] = useState(defaultThemeValue);
  const themeHandler = (color) => {
    setTheme((prev) => ({
      ...prev,
      color,
    }))
  };

  const color = theme.color;
  useEffect(() => {
    localStorage.setItem(previousThemeStorageKey, color);
  }, [color]);

  return (
    <>
      <ThemeContext.Provider value={{color, changeTheme: themeHandler}}>
        <Provider store={store}>
          <Navbar/>
          <div className="container pt-2">
            <Outlet/>
          </div>
          <Footer/>
        </Provider>
      </ThemeContext.Provider>
    </>
  );
};

export default React.memo(Layout);
