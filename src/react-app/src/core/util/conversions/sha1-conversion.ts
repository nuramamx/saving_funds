import { sha1 } from "js-sha1";

export async function ToSHA1(message: string): Promise<string> {
  const hash = sha1(message);

  return hash;
}