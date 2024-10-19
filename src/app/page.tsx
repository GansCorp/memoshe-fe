import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Selamat datang di MEMOSHE</h1>
      <Link href="/flashcards" className="text-blue-500 hover:underline">
        Pergi ke Flashcards
      </Link>
    </main>
  )
}