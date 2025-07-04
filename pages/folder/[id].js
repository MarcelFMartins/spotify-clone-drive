import { google } from 'googleapis';
import { getToken } from '../../utils/auth';
import { listFolders, listAudioFiles } from '../../utils/drive';
import Link from 'next/link';
import styles from '../../styles/Folder.module.css';

export async function getServerSideProps(context) {
  const folderId = context.params.id;
  const auth = await getToken(context.req);
  const drive = google.drive({ version: 'v3', auth });

  const folders = await listFolders(drive, folderId);
  const audios = await listAudioFiles(drive, folderId);

  return { props: { folders, audios } };
}

export default function Folder({ folders, audios }) {
  return (
    <div className={styles.container}>
      <h1>Conteúdo da Pasta</h1>

      <h2>Pastas</h2>
      {folders.length === 0 && <p>Nenhuma pasta encontrada.</p>}
      <ul>
        {folders.map(folder => (
          <li key={folder.id}>
            <Link href={`/folder/${folder.id}`} legacyBehavior>
              <a>{folder.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <h2>Músicas</h2>
      {audios.length === 0 && <p>Nenhuma música encontrada.</p>}
      <ul>
        {audios.map(audio => (
          <li key={audio.id}>
            <span>{audio.name}</span>
            <audio controls preload="auto" src={`/api/stream/${audio.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
