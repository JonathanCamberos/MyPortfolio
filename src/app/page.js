import { allBlogs } from "../../.contentlayer/generated";
import FeaturedPosts from "../components/Home/CurrentlyWorkingOk";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import Head from "next/head";

export default function Home() {
    return (
        <>
            {/* SEO Metadata */}
            <Head>
                <title>Jonathan Camberos - Software Developer Portfolio</title>
                <meta
                    name="description"
                    content="Portfolio Resume of Jonathan Camberos, software development, cybersecurity, leetcode, projects."
                />
                <meta
                    name="keywords"
                    content="Jonathan Camberos, software developer, software development, portfolio, resume, cybersecurity, programming"
                />
                <meta name="author" content="Jonathan Camberos" />
                <meta property="og:title" content="Jonathan Camberos - Software Developer Portfolio" />
                <meta
                    property="og:description"
                    content="Portfolio Resume of Jonathan Camberos, software development, cybersecurity, leetcode, projects."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://portfolio-jonathan-camberos.vercel.app/" />
                {/* <meta property="og:image" content="/path-to-thumbnail.jpg" /> */}
                {/* <meta name="twitter:card" content="summary_large_image" /> */}
                {/* <meta name="twitter:title" content="Jonathan Camberos - Software Developer Portfolio" /> */}
                {/* <meta name="twitter:description" content="Explore the portfolio of Jonathan Camberos." /> */}
                {/* <meta name="twitter:image" content="/path-to-thumbnail.jpg" /> */}

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Jonathan Camberos",
                            "url": "https://portfolio-jonathan-camberos.vercel.app/",
                            "sameAs": [
                                "https://www.linkedin.com/in/jonathancamberos/",
                                "https://github.com/JonathanCamberos"
                            ],
                            "jobTitle": "Software Developer",
                        }),
                    }}
                />
            </Head>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center">
                <HomeCoverSection blogs={allBlogs} />
                <FeaturedPosts blogs={allBlogs} />
            </main>
        </>
    );
}