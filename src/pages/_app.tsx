import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/libs/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Whats App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
