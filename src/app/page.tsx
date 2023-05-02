import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='h-screen flex justify-center items-center'>
      <h1>This is the main homepage</h1>
    </main>
  )
}
