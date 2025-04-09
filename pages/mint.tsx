"use client";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity, Metaplex } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import { uploadToLighthouse, uploadMetadataToLighthouse } from "../utils/lighthouseUpload";

const SOLANA_RPC = "https://api.devnet.solana.com";

export default function MintPage() {
  const wallet = useWallet();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    image: File | null;
  }>({
    title: "",
    description: "",
    image: null,
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wallet.connected || !wallet.publicKey) {
      return alert("지갑을 연결해주세요.");
    }

    if (!formData.image) {
      return alert("이미지를 업로드해주세요.");
    }

    try {
      setStatus("🚀 이미지 업로드 중...");
      const imageUrl = await uploadToLighthouse(formData.image);

      setStatus("🧾 메타데이터 업로드 중...");
      const metadataUri = await uploadMetadataToLighthouse(
        imageUrl,
        formData.title,
        formData.description
      );

      setStatus("🔨 NFT 민팅 중...");
      const connection = new Connection(SOLANA_RPC, "confirmed");
      const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

      const { nft } = await metaplex.nfts().create({
        uri: metadataUri,
        name: formData.title,
        symbol: "BROOOM",
        sellerFeeBasisPoints: 0,
        creators: [{ address: wallet.publicKey, share: 100 }],
      });

      setStatus(`✅ NFT 민팅 완료! 🎉\nMint: ${nft.address.toBase58()}`);

      // 🚀 밈코인 에어드랍 로직 (추후 연동)
      // await airdropTo(wallet.publicKey);

    } catch (error) {
      console.error(error);
      setStatus("❌ 민팅 실패. 콘솔 로그를 확인하세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-8">
      <form
        onSubmit={handleMint}
        className="bg-gray-100 p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6">🚗 NFT 등록</h2>

        <label className="block mb-2 font-medium">차량 이름</label>
        <input
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded border mb-4"
          placeholder="예: Hyundai Ioniq 5"
        />

        <label className="block mb-2 font-medium">설명</label>
        <textarea
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded border mb-4"
          rows={3}
          placeholder="차량 설명을 입력하세요"
        />

        <label className="block mb-2 font-medium">차량 이미지</label>
        <input
          name="image"
          type="file"
          required
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-6"
        />

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800"
        >
          NFT 등록 & 밈코인 에어드랍 받기
        </button>

        {status && (
          <p className="mt-4 text-center whitespace-pre-line text-sm text-gray-700">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}