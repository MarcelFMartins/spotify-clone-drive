import { google } from 'googleapis';
import { getToken } from '../utils/auth';
import { listFolders } from '../utils/drive';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export async function getServerSideProps(context) {
  const auth = await getToken(context.req);
  const drive = google.drive({ version: 'v3', auth });
  const folders = await listFolders(drive);

  return { props: { folders } };
}

export default function Home({ folders }) {
  return (
    <div className={styles.container}>
      <h1>Escolha um Gênero</h1>
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>
            <Link href={`/folder/${folder.id}`} legacyBehavior>
              <a>{folder.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}