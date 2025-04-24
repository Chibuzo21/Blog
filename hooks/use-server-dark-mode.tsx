// import { cookies } from "next/headers";
const ServerDarkMode = () => {
  // return (await cookies()).get("theme")?.value ?? defaultTheme;
  //   This means if cookies through the get method retrives any value from the name "theme"then this function rturns that value but if it was undefined or no value could be traced or retrieved then the above function should return the default theme which is a string
  // cookies was later removed as it is not reliable, we can use next-theme instead
  return;
};
// Cookies makes a site to be dynamically rendered
export default ServerDarkMode;
// This is a server component
