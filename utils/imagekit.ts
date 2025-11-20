// utils/imagekit.ts
import ImageKit from "imagekit";

export function getImageKit() {
  const ik = new ImageKit({
    publicKey: process.env.IK_PUBLIC_KEY || "",
    privateKey: process.env.IK_PRIVATE_KEY || "",
    urlEndpoint: process.env.IK_URL_ENDPOINT || ""
  });
  return ik;
}
