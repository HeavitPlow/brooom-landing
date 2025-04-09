import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

require("@solana/wallet-adapter-react-ui/styles.css");

const SolanaProvider = dynamic(() => import("../components/SolanaProvider"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaProvider>
      <Component {...pageProps} />
    </SolanaProvider>
  );
}
