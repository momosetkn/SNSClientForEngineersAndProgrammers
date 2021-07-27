import {imageMaxSize} from "./Api";

export const asyncConvertBase64 = async (file: File) => {
  const result = new Promise((r) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      r(e.target?.result);
    };
    fr.readAsDataURL(file);
  });
  const base64 = (await result) as any as string;
  if (base64.length > imageMaxSize) {
    console.error(`base64 size is ${base64.length}`);
    return null
  }
  return base64;
}
