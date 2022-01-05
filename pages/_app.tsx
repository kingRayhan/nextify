import "@/styles/app.scss";
import toast, { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  pageProps.toast = toast;
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
