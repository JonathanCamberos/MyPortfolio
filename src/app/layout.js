import { cx } from '@/utils'
import './globals.css'
import { Inter, Manrope } from 'next/font/google'
import Header from '@/components/Header';

// documentation:
// layout.js will also be shared across all the routes
// specifically, the className will be passed to all Children

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

//const inter = Inter({ subsets: ['latin'], display: "swap", variable: "--font-in"})
//const manrop = Manrope({ subsets: ['latin'], display: "swap", variable: "--font-mr"})


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      className={cx(
        inter.variable, 
        manrope.variable, 
        "font-mr bg-light"
        )}>
        <Header />
        {children}
      </body>
    </html>
  )
}
