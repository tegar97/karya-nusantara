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
import { CategoryProductProvider } from "../context/productCategory";
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
        <CategoryProductProvider>
          <Head>
            <Html lang="id" />
            <meta
              name="google-site-verification"
              content="8pKRIkpctIK_LbLou5qxfbL_YcR2Ovc2D990W1FPFhU"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,800&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Navbar setMenuDrop={setMenuDrop} menuDrop={menuDrop} />

          <Component {...pageProps} />
          {pathname === "/register-ukm" ||
          pathname === "/register-konsumen" ||
          pathname === "/success" ||
          pathname === "/success-ukm" ||
          pathname === "/register-mitra" ? (
            ""
          ) : (
            <FooterComponent />
          )}
        </CategoryProductProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
