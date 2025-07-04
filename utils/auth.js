import { getSession } from 'next-auth/react';

export async function getToken(req) {
  const session = await getSession({ req });
  const token = session?.accessToken;

  if (!token) throw new Error('Usuário não autenticado');

  const { google } = require('googleapis');
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  return oauth2Client;
}