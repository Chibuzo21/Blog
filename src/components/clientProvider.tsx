"use client";
import React from "react";
// import { CookiesProvider } from "react-cookie";
import { useEffect, useState } from "react";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  // return <CookiesProvider>{children}</CookiesProvider>;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
  // we use this component to prevent a mismatch between our server rendering and our client rendering. we track our rendering using a state called mount. we are saying, when mount is false which is the default value, then return null ie dont render.until the ui is mounted on the browser you can now return the children(theme provider,header, main). This is cause our browser has a light theme by default till we change it to dark which might cause a mismatch
};

export default ClientProvider;
