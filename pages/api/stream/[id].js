import { google } from 'googleapis';
import { getToken } from '../../../utils/auth';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const auth = await getToken(req);
    const drive = google.drive({ version: 'v3', auth });

    const driveRes = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );

    res.setHeader('Content-Type', 'audio/mpeg'); // ou 'audio/mp3'
    driveRes.data.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao carregar áudio');
  }
}