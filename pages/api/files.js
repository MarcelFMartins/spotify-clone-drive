import { getToken } from "next-auth/jwt";
import { listDriveAudioFiles } from "../../lib/drive";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  if (!token) return res.status(401).json({ error: "Não autenticado" });

  const files = await listDriveAudioFiles(token.accessToken);
  res.status(200).json(files);
}