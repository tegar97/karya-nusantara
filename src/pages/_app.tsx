import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar/Navbar.component";
import "./../styles/globals.css";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/auth";
import FooterComponent from "../components/Footer/Footer.component";
import { useState } from "react";
import Link from "next/link";
import { Html } from "next/document";
import Head from "next/head";
axios.defaults.baseURL = `${process.env.API_GOLANG}/api`;
axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
};

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/register"];
  const authRoute = authRoutes.includes(pathname);
  const [menuDrop, setMenuDrop] = useState(false);
  return (
    <div className="relative">
      <AuthProvider>
        <Head>
          <Html lang="id" />
        </Head>
        <Navbar setMenuDrop={setMenuDrop} menuDrop={menuDrop} />

        <Component {...pageProps} />
        <FooterComponent />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
