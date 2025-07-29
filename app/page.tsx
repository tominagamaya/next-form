"use client";
import { useRouter } from 'next/navigation';
import { TextLink } from './components/TextLink';
import styles from './page.module.css';
import { pagesPath } from '@/utils/$path';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <TextLink
        name={'登録する'}
        onClick={() => router.push(pagesPath.input.$url().pathname)}
      />
    </div>
  );
}

export default Home;