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

export const eq = (a: any, b: any): boolean => {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object') return false;
  if (typeof b !== 'object') return false;
  const aEntries = Object.entries(a);
  const bEntries = Object.entries(b);
  if (aEntries.length !== bEntries.length) return false;
  return aEntries.every(([aKey, aValue]) => eq(aValue, b[aKey]));
};
