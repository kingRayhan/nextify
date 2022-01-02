import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/app.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
