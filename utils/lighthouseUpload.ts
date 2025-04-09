import lighthouse from "@lighthouse-web3/sdk";

const API_KEY: string = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "";

if (!API_KEY) {
  console.error("❌ Lighthouse API Key is missing! Check your .env.local file.");
  throw new Error("Missing LIGHTHOUSE_API_KEY environment variable");
}

export async function uploadToLighthouse(file: File): Promise<string> {
  try {
    console.log("📤 Uploading file to Lighthouse...");

    const output = await lighthouse.upload([file], API_KEY);
    const cid = output.data.Hash;

    console.log("✅ File uploaded to IPFS:", cid);
    return `https://gateway.lighthouse.storage/ipfs/${cid}`;
  } catch (error) {
    console.error("❌ Error uploading file to Lighthouse:", error);
    throw new Error("Failed to upload file to Lighthouse");
  }
}

export async function uploadMetadataToLighthouse(
  imageUrl: string,
  name: string,
  description: string
): Promise<string> {
  try {
    console.log("📤 Uploading metadata to Lighthouse...");

    const metadata = {
      name,
      symbol: "BROOOM",
      description,
      image: imageUrl,
      properties: {
        files: [{ uri: imageUrl, type: "image/png" }],
        category: "image",
      },
    };

    const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    const metadataFile = new File([metadataBlob], "metadata.json", { type: "application/json" });

    const output = await lighthouse.upload([metadataFile], API_KEY);
    const cid = output.data.Hash;

    console.log("✅ Metadata uploaded to IPFS:", cid);
    return `https://gateway.lighthouse.storage/ipfs/${cid}`;
  } catch (error) {
    console.error("❌ Error uploading metadata to Lighthouse:", error);
    throw new Error("Failed to upload metadata to Lighthouse");
  }
}