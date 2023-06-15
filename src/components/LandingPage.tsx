import Link from 'next/link'

const LandingPage = () => {
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Bienvenidos a Baja Blast</h1>
        <Link href={'/profile'}>Registrate</Link>
        <span></span>
      </div>
    </div>
  )
}

export default LandingPage
