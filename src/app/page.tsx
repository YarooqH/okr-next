import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h3>Hello</h3>
    </main>
    </>
  )
}
