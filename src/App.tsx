import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import NameEntry from './components/NameEntry';
import Envelope from './components/Envelope';
import ReplyPage from './components/ReplyPage';
import EndPage from './components/EndPage';
import AdminPage from './components/AdminPage';
import { PageType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('name_entry');
  const [username, setUsername] = useState('');

  const handleNameEntry = (name: string) => {
    setUsername(name);
    if (name.toLowerCase() === 'mirul') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('envelope');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent pointer-events-none"></div>
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 max-w-7xl mx-auto w-full z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'name_entry' && (
            <NameEntry key="name" onNext={handleNameEntry} />
          )}
          {currentPage === 'envelope' && (
            <Envelope key="envelope" username={username} onNext={() => setCurrentPage('reply')} />
          )}
          {currentPage === 'reply' && (
            <ReplyPage key="reply" username={username} onNext={() => setCurrentPage('end')} />
          )}
          {currentPage === 'end' && (
            <EndPage key="end" />
          )}
          {currentPage === 'admin' && (
            <AdminPage key="admin" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
