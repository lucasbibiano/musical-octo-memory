import { useEffect, useState } from "react";
import { compressAndEncode, decompressAndDecode } from "./compressor";

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function changeKey(key: string, steps: number): string {
  if (key.includes("/")) {
    return key
      .split("/")
      .map((k) => changeKey(k, steps))
      .join("/");
  }

  const index = keys.findLastIndex((k) => key.startsWith(k));
  const newIndex = (index + steps) % keys.length;
  const newKey = keys[newIndex >= 0 ? newIndex : keys.length + newIndex];
  const result = key.replace(keys[index], newKey);

  return result;
}

export function useEncodedParams() {
  const [result, setResult] = useState("");

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const value = params.get("data") || "";

  const setEncodedParam = (data: string) => {
    setResult(data);
    
    compressAndEncode(data).then((encoded) => {
      const encodedParams = data ? `?data=${encoded}` : "";
      window.history.pushState({}, "", encodedParams);
    });
  };

  useEffect(() => {
    decompressAndDecode(value).then((data) => {
      setResult(data || "");
    });
  }, [value]);

  return {
    result,
    setEncodedParam,
  };
}
