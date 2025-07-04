export async function listFolders(drive, parentId = 'root') {
  const res = await drive.files.list({
    q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
  });
  return res.data.files;
}

export async function listAudioFiles(drive, folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'audio/' and trashed = false`,
    fields: 'files(id, name, webContentLink)',
  });
  return res.data.files;
}