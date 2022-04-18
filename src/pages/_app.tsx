import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar/Navbar.component";
import "./../styles/globals.css";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/auth";
import FooterComponent from "../components/Footer/Footer.component";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Html } from "next/document";
import Head from "next/head";
import { MuiThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import { CategoryProductProvider } from "../context/productCategory";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import theme from "../theme/theme";
import { Provider } from "react-redux";
import configStore from "../redux/cart/store/configStore";
  
axios.defaults.baseURL = `${process.env.API_V2}/api`;
// axios.defaults.withCredentials = true;
axios.defaults.headers = {
  "Content-Type": "application/json",
};




function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const authRoutes = ["/register"];
  const router = useRouter();
  const authRoute = authRoutes.includes(pathname);
  const [menuDrop, setMenuDrop] = useState(false);

  // useEffect(() => {
  //   const token = Cookie.get("token");
  //   const loadUser = async () => {

  //     if (token) {
  //       console.log('yesss',token.replace(/(\r\n|\n|\r)/gm, ""));
  //       await axios
  //         .get("/auth/me", {
  //           headers: {
  //             Authorization: `Bearer ${token.replace(/(\r\n|\n|\r)/gm, "")} `,
  //           },
  //         })
  //         .then((res) => {
  //           const userData =res.data?.data?.data
  //           const storeToCookie = {
  //             id: userData.id,
  //             name: userData.name,
  //             email: userData.email

  //           };
  //           Cookie.set("userData", JSON.stringify(storeToCookie));
            
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }

  //   }
  //   loadUser()
  // }, []);

 useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
 }, []);
  
  const initialState = {
    products: [],
  };
const store = configStore(initialState);

  return (
    <div className="relative">
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
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
              {pathname === "/payment/detail/[code]" ? (
                ""
              ) : (
                <Navbar setMenuDrop={setMenuDrop} menuDrop={menuDrop} />
              )}

              <Component {...pageProps} />
              {pathname === "/register-ukm" ||
              pathname === "/register-konsumen" ||
              pathname === "/success" ||
              pathname === "/success-ukm" ||
              pathname === "/register-mitra" ||
              pathname === "/payment/detail/[code]" ? (
                ""
              ) : (
                <FooterComponent />
              )}
            </CategoryProductProvider>
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
