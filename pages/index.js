import { getSession } from 'next-auth/react';
import { google } from 'googleapis';
import { getToken } from '../utils/auth';
import { listFolders } from '../utils/drive';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const auth = await getToken(context.req);
  const drive = google.drive({ version: 'v3', auth });
  const folders = await listFolders(drive);

  return { props: { folders } };
}