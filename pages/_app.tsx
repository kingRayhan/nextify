import store from "@/store/store";
import "@/styles/app.scss";
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
