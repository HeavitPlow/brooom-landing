import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image"; 

const WalletButton = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  const handleMintRedirect = () => {
    router.push("/mint");
  };

  return (
    <>
      <Head>
        <title>$BROOOM - Meme Car NFT Community</title>
        <meta name="description" content="$BROOOM - 당신의 자동차 NFT에 부스터를!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white text-black px-6 py-10 font-sans">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/1743488732253.jpg" 
              alt="$BROOOM Logo"
              width={50}
              height={50}
              className="rounded"
            />
            <h1 className="text-3xl font-bold">$BROOOM</h1>
          </div>
          <WalletButton />
        </header>

        {/* Hero Section */}
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">🚗 $BROOOM Meme Coin</h2>
          <p className="text-lg mb-2">자동차 NFT에 부스터를 달아주는 커뮤니티 중심 밈코인</p>
          <h3 className="text-2xl font-semibold mb-6">브룸하고, 리워드 받고!</h3>
          <button
            onClick={handleMintRedirect}
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            NFT 등록하고 에어드랍 받기
          </button>
        </section>

        {/* Why BROOOM */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold mb-4">왜 $BROOOM인가요?</h3>
          <ul className="list-disc pl-6 space-y-2 text-left max-w-md mx-auto">
            <li>자동차 NFT 등록 시 자동으로 $BROOOM 에어드랍</li>
            <li>커뮤니티 중심의 재미있는 레이싱 밈코인</li>
            <li>실제 차량 & 오프라인 사용처와 연결 가능성</li>
          </ul>
        </section>

        {/* Community Links */}
        <section className="mb-20 text-center">
          <h3 className="text-2xl font-bold mb-4">커뮤니티와 함께하세요!</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#" className="border px-4 py-2 rounded hover:bg-gray-100">Twitter</a>
            <a href="#" className="border px-4 py-2 rounded hover:bg-gray-100">Discord</a>
            <a href="#" className="border px-4 py-2 rounded text-gray-400 cursor-not-allowed">
              커뮤니티 미션 참여하기 (준비 중)
            </a>
          </div>
        </section>

        {/* Closing */}
        <section className="text-center">
          <p className="text-xl font-semibold">귀엽게, 빠르게, $BROOOM하게</p>
        </section>
      </main>
    </>
  );
}

