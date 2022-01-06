import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import store from "@/store/store";
import "@/styles/app.scss";
// import "@shopify/polaris/build/esm/styles.css";
import toast, { Toaster } from "react-hot-toast";
import { Provider as ReduxtProvider } from "react-redux";

function NuxtifyApp({ Component, pageProps }) {
  pageProps.toast = toast;
  return (
    <ReduxtProvider store={store}>
      <Toaster />
      <Component {...pageProps} />
    </ReduxtProvider>
  );
}

export default NuxtifyApp;
