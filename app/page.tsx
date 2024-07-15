"use client";
import { useRouter } from 'next/navigation';
import { TextLink } from './components/TextLink';
import styles from './page.module.css'; 

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <TextLink
        name={'登録する'}
        onClick={() => router.push("/input")}
     />
    </div>
  );
}

export default Home;