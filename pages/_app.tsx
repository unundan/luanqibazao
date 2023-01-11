import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../front_common/store";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Component {...rest.pageProps} /></Provider>
  );
}
