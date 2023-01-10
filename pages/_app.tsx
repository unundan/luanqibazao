import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wapper } from "../front_common/store";

export default function App({ Component, pageProps, ...rest }: AppProps) {
  // const { store, props } = wapper.useWrappedStore({ pageProps, ...rest });
  return (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
  );
}
