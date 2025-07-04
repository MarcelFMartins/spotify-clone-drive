// /pages/api/lista-audios.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    // Aqui você deve criar o cliente OAuth2 com as credenciais do usuário logado
    // Exemplo simplificado (você deve passar o token real do usuário que está logado)
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Pega o token do usuário (você deve passar isso do front-end)
    auth.setCredentials({
      access_token: req.headers.authorization || '',
    });

    const drive = google.drive({ version: 'v3', auth });

    async function listAudioFiles(folderId = 'root') {
      const res = await drive.files.list({
        q: `'${folderId}' in parents and (mimeType contains 'audio/' or mimeType = 'application/vnd.google-apps.folder') and trashed = false`,
        fields: 'files(id, name, mimeType)',
        spaces: 'drive',
      });

      const files = res.data.files;
      let audioFiles = [];

      for (const file of files) {
        if (file.mimeType === 'application/vnd.google-apps.folder') {
          const nestedFiles = await listAudioFiles(file.id);
          audioFiles = audioFiles.concat(nestedFiles);
        } else {
          audioFiles.push(file);
        }
      }
      return audioFiles;
    }

    const audioFiles = await listAudioFiles();
    return res.status(200).json(audioFiles);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
}