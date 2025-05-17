import Link from 'next/link';
import JobLayout from '../../components/About/JobLayout';
import Image from 'next/image';
// import aboutImage from "/images/about_img.jpg"
// import aboutImage from '../../public/images/about_img.jpg'
//


export default function About() {
  const skills = [
    "Java",
    "Python",
    "OCaml",
    "Haskell",
    "C",
    "JavaScript",
    "Docker",
    "Git",
    "React",
    "SQL"
  ];

  const jobs = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      date: "July 2024 - Present",
      description: "Security Operations and Threat Response"
    },
    {
      title: "Software Engineer",
      company: "Bank of America",
      date: "June 2023 - Aug 2023",
      description: "Network Security"
    },
    {
      title: "Software Engineer",
      company: "PwC",
      date: "June 2022 - Aug 2022",
      description: "Web Applications Consulting"
    }
  ];

  const coursework = [
    "Computer Networks",
    "Cryptography",
    "Compilers", 
    "Computer and Network Security (Teaching Assistant)",
    "Algorithms",
    "Computer Systems Architecture", 
    "IoT Security",
    "Web Application Development with JavaScript",
    "Ethical Hacking"
  ]

  return (
    <section className="w-full min-h-screen pt-4 border-t-2 border-b-2 border-solid 
        border-dark dark:border-light flex flex-col md:flex-row items-center justify-center 
        text-dark dark:text-light"
    >
      <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-2rem)]">
      {/* Left side: Picture and Introduction */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
        {/* <img 
          src="/images/about_img.jpg" 
          alt="img" 
          className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-lg mb-4" 
        /> */}
        
        {/*  ##### Image #####  */}
        <Image src="/images/about_img.jpg"
          placeholder='blur'
          alt="img of me:)"
          blurDataURL="blur.jpg"
          width="80"
          height="60"
          className='w-1/2 object-center object-cover rounded-xl group-hover:scale-105 
          transition-all ease duration-300'
          sizes='(max-width: 1180px) 100vw, 50vw'
        />

        {/* <Image src={aboutImage}
          alt="img of author"
        /> */}



        <p className="text-left mt-4">
          Hi! I'm Jonathan. A recent grad from the University of Maryland, College Park.
          I majored in Computer Science with a concentration in Cybersecurity and a minor in 
          ACES (Advanced Cybersecurity Experience for Students).
        </p>
        {/* <p className="text-left mt-4">
          University of Maryland, College Park - 
          Computer Science: No. 18 nationally and No. 9 public institutions, 
          Cybersecurity: No. 11 overall, No. 7 among publics as of{" "}
          <a 
            href="https://today.umd.edu/umd-rises-in-u-s-news-rankings-of-national-universities" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 underline hover:text-blue-700 transition-colors"
          >
            September 18, 2023
          </a>
        </p>
        <p className="text-left mt-4">
          I worked alongside the UMD Office of Multi-Ethnic Student Education to foster and increase minority representation in CS
          through tutoring undergrad computer science courses and supporting the internal database 
          of the University of Maryland Hispanic and Black organization under UMD - OMSE 
          (Office of Multi-Ethnic Student Education): College Success Scholars.
        </p> */}
        <p className="text-left mt-4">
          I currently work as a Software Engineer at Bank of America supporting and building internal Cybersecurity Applications.
        </p>

        {/* <a 
          href="/path/to/your/resume.pdf" 
          download 
          className="mt-4 px-4 py-2 bg-accent dark:bg-accentDark  text-light dark:text-dark rounded-lg
                    hover:scale-105 transition-all ease duration-200 text-sm"
        >
           Resume
        </a> */}
      </div>

        {/* Horizontal Line Divider for small screens */}
        <div className="block md:hidden w-full h-px bg-black dark:bg-light my-4"></div>
        {/* Vertical Line Divider for larger screens */}
        <div className="hidden md:flex w-px bg-black dark:bg-light mx-4"></div>

        {/* Right side: Education, Experience, Skills, and Coursework */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          {/* Education Section */}
          <div className="p-6 rounded-lg w-full max-w-lg mb-1"> {/* Reduced margin-bottom */}
            <h2 className="text-xl font-semibold mb-2 text-center">Education</h2>
            <div className="flex justify-between items-start">
              <div className="flex flex-col flex-1">
                <span className="font-bold">University of Maryland</span>
                <span className="text-dark dark:text-light mt-1 text-sm sm:text-base leading-tight">
                  B.S. Computer Science - Cybersecurity Track
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-accent dark:text-accentDark font-light whitespace-nowrap">
                  Aug 2020 - May 2024
                </span>
                <span className="text-sm font-medium text-dark dark:text-light mt-1">
                  GPA: 3.5
                </span>
              </div>
            </div>
          </div>

          {/* Experience Section with Timeline */}
          <div className="w-full p-2 rounded-lg max-w-lg relative mb-2 mt-1"> {/* Reduced margin-bottom and added margin-top */}
            <h2 className="text-xl font-semibold mb-4 text-center">Experience</h2>
            <div className="absolute left-0 top-0 h-full w-1 bg-gray-300 dark:bg-gray-700"></div>
            <div className="ml-8">
              {jobs.map((job, index) => (
                <JobLayout
                  key={index}
                  title={job.title}
                  company={job.company}
                  date={job.date}
                  description={job.description}
                />
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="p-4 rounded-lg w-full max-w-lg mb-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center"> {/* Slightly increased gap */}
              {skills.map(skill => (
                <Link
                  key={skill}
                  href={`/categories/${skill}`}
                  className="inline-block py-1.5 px-4 bg-accent dark:bg-accentDark 
                      text-light dark:text-dark rounded-full capitalize font-semibold 
                      border-2 border-solid border-light dark:border-dark hover:scale-105 transition-all 
                      ease duration-200 text-sm"
                >
                  {skill}
                </Link>
              ))}
            </div>
          </div>

          {/* Relevant Coursework Section */}
          <div className="p-6 rounded-lg w-full max-w-xl"> {/* Increased max-width */}
            <h2 className="text-xl font-semibold mb-4 text-center">Relevant Coursework</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {coursework.map((course, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-gray-600 dark:bg-gray-400 rounded-full mr-2"></span> {/* Dot */}
                  <span className="text-sm sm:text-base font-medium text-dark dark:text-light">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}