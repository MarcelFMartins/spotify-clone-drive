import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token || !token.accessToken) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?q=mimeType contains 'audio/'&fields=files(id,name)&spaces=drive",
    {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    }
  );

  const data = await response.json();
  res.status(200).json({ files: data.files || [] });
}