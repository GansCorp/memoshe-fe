import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <header className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-blue-400">MEMOSHE</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-100">Selamat datang di MEMOSHE</h2>
          <p className="text-xl mb-8 text-gray-300">Platform belajar dengan flashcard interaktif</p>
          <Link href="/flashcards" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Mulai Belajar dengan Flashcards
          </Link>
        </div>
      </main>
    </div>
  )
}
