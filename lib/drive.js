import { google } from "googleapis";

export async function listDriveAudioFiles(token) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });

  const drive = google.drive({ version: "v3", auth });

  const files = [];
  let pageToken = null;

  do {
    const res = await drive.files.list({
      q: "mimeType contains 'audio/' and trashed = false",
      fields: "nextPageToken, files(id, name, mimeType, webContentLink)",
      spaces: "drive",
      pageToken: pageToken || undefined,
    });

    files.push(...res.data.files);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return files;
}