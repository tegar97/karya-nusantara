import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar/Navbar.component";
import "./../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
