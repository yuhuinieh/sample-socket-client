import { exchangeKeys } from "@/service/auth.service";

// ! 將原始資料轉換成「位元」格式，使用 TextEncoder API
// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
const encode = (data: any) => {
    const encoder = new TextEncoder();  
    return encoder.encode(data)
}

// ! 當使用相同的金鑰加密多組資料時，可以找出加密區塊之間的關係，從而暴露部分或全部原始訊息。
// ! IV 確保輸入資料中的重複字元序列在產生的密碼中產生不同的位元組序列
// https://developer.mozilla.org/en-US/docs/Web/API/AesGcmParams
export const generateIv = () => {
    return window.crypto.getRandomValues(new Uint8Array(12))
}

// ! 將加密後的資料轉成 Base64 格式
// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export const pack = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    return window.btoa(
      String.fromCharCode.apply(null, Array.from(bytes))
    )
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
export const unpack = (packed: any) => {
  const string = window.atob(packed)
  const buffer = new ArrayBuffer(string.length)
  const bufferView = new Uint8Array(buffer)

  for (let i = 0; i < string.length; i++) {
    bufferView[i] = string.charCodeAt(i)
  }

  return buffer
}

export const exportCryptoKey = async (key: CryptoKey) => {
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    return pack(exportedKey);
}

export const importCrytoKey = (key: string) => {
 
  // 将 Base64 字符串解码为 ArrayBuffer
  const buffer = Uint8Array.from(atob(key), c => c.charCodeAt(0)).buffer;
  return window.crypto.subtle.importKey(
    "raw",
    buffer,
    { name: "ECDH", namedCurve: "P-256" },
    true,
    []
  )
}

// 產生 ECDH key pair
export const generateECDHKeyPair = async () => (
  await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256", // 或者其他曲线，如 "P-384" 或 "P-521"
    },
    true, // 是否是用于签名，默认为 false
    ["deriveKey"] // 這個密鑰的用途 - 此為允許衍生出密鑰
  )
)

// 產生雙方共享的 ECDH 密鑰，對方的 public key + 自身的 private key 產生
export const deriveSharedKey = async (privateKey: CryptoKey, publicKey: CryptoKey) => (
  await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: publicKey,
    },
    privateKey,
    {
      name: "AES-GCM", // 使用 AES-GCM 算法
      length: 256, // 密鑰長度為 256 位
    },
    true, // 是否可以傳入 SubtleCrypto.exportKey() or SubtleCrypto.wrapKey() 
    ["encrypt", "decrypt"] // 這個密鑰的用途 - 此為加密與解密
  )
)

export const encrypt = async (data: any, key: CryptoKey) => {
  const encoded = encode(data);
  const iv = generateIv();
  const cipherText = await window.crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv: iv,
  }, key, encoded)

  // Extract authentication tag
  const authTag = cipherText.slice(-16);
  // Extract ciphertext
  const ciphertext = cipherText.slice(0, -16);
  
  return { iv, ciphertext, authTag };
}

const getExchageKeys = async () => {
  // 1. 產生 ECDH keys
  const keys = await generateECDHKeyPair();
  const publicKey = await exportCryptoKey(keys.publicKey);
  // 2. 交換 public keys
  const {publicKey: anotherPublicKey} = await exchangeKeys({publicKey});
  const unpackKey = await importCrytoKey(anotherPublicKey);
  // 3. 產生 sharedKey
  const key = await deriveSharedKey(keys.privateKey, unpackKey);
  return key
}

export const encryptData = async (data: unknown) => {
  try {
      const sharedKey = await getExchageKeys();
      console.log('sharedKey',sharedKey);
      const {iv, ciphertext, authTag} = await encrypt(data, sharedKey);
      // 將 iv 與 chiper 用：組裝起來
      return  pack(iv)+':'+pack(ciphertext)+':'+pack(authTag);
  } catch(e) {
      console.error('加密異常：', e);
  }
}