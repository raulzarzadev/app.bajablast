import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bienvenidos a Baja Blast</h1>
      <Link href={'/profile'}>Registrate</Link>
      <span></span>
    </main>
  )
}
