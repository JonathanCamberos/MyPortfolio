import Image from 'next/image'


// the page.js is a ui that is unique to every route
// page.js is directly under the app directory
// represents https://localhost:3000

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world!
    </main>
  )
}
