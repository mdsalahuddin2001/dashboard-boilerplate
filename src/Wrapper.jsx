import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleRTL,
  toggleTheme,
  toggleLocale,
  toggleMenu,
  toggleLayout,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
} from "./features/theme/themeConfigSlice";
import store from "./app/store";

// eslint-disable-next-line react/prop-types
function Wrapper({ children }) {
  const themeConfig = useSelector((state) => state.themeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem("menu") || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem("layout") || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem("rtlClass") || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem("animation") || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem("navbar") || themeConfig.navbar)
    );
    dispatch(
      toggleLocale(localStorage.getItem("i18nextLng") || themeConfig.locale)
    );
    dispatch(
      toggleSemidark(localStorage.getItem("semidark") || themeConfig.semidark)
    );
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.locale,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${
        (store.getState().themeConfig.sidebar && "toggle-sidebar") || ""
      } ${themeConfig.menu} ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section antialiased relative font-inter text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
