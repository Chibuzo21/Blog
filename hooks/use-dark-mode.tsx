import { useState } from "react";
import { useCookies } from "react-cookie";

const useDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = useState(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const setAndSaveTheme = (theme: string) => {
    setTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    // documentElement refers to the root node, which in this class is our html element in the layout.ts
    document.documentElement.classList.add(theme);
    setCookie("theme", theme);
    // The cookie value is kept in the browser but is being sent to the server by the browser
  };
  const toggleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, toggleTheme };
};
export default useDarkMode;
