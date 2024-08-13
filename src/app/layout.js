import { cx } from './../utils'
import './globals.css'
import { Inter, Manrope } from 'next/font/google'
import Header from './../components/Header';
import Footer from '../components/Footer';
import siteMetadata from '../utils/siteMetaDataFile'
import Script from 'next/script';

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


/* NOTE: metadata is in layout so that it is shared across all the 
   pages/routes

   nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object
   --> full list of possible objects in metaData object
*/
export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, //default is required when creating template
  },
  description: siteMetadata.description,
  openGraph: {  /*added for social media picture*/
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      siteMetadata.socialBanner
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true, /* enables blog to be indexed by other search engines */
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
      className={cx(
        inter.variable,  
        manrope.variable, 
        "font-mr bg-light dark:bg-dark "
        )}>
        

        {/* from tailwindcss.com/docs/dark-mode */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            // document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('dark')
          } else {
            // document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('dark')
          }`}
        </Script>

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
