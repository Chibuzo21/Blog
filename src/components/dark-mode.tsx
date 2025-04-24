"use client";

// import useDarkMode from "../../hooks/use-dark-mode";
import { useTheme } from "next-themes";
// interface iconsType {
//   [key: string]: string;
// }
// this is index signature which allows us to use bracket notation in accesing objects as object keys have data types
// const nextModeIcons: iconsType = {
//   light: ,
//   dark: ,
// };
// type defaultType = {
//   defaultTheme: string;
// };
const DarkMode = (): React.JSX.Element => {
  // const { theme, toggleTheme } = useDarkMode(defaultTheme);
  const { theme, setTheme } = useTheme();
  // return <button onClick={toggleTheme}>{nextModeIcons[theme]}</button>;
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌚" : "🌝"}
    </button>
  );
};

export default DarkMode;
