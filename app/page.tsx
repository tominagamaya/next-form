"use client";
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="space-y-12">
      TOPページ
      <button 
        className="mt-10 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => router.push("/input")}
        >
        登録する
      </button>
    </div>
  );
}

export default Home;