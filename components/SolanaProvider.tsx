import {
    ConnectionProvider,
    WalletProvider
  } from "@solana/wallet-adapter-react";
  import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
  import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
  import { useMemo, ReactNode } from "react";
  
  // ✅ props 타입 지정
  interface SolanaProviderProps {
    children: ReactNode;
  }
  
  export default function SolanaProvider({ children }: SolanaProviderProps) {
    const endpoint = "https://api.devnet.solana.com";
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }