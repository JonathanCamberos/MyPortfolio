import Link from 'next/link';
import JobLayout from '../../components/About/JobLayout';
import Image from 'next/image';

export default function About() {
  const skills = [
    "React.js",
    "SQL",
    "Python",
    "Java",
    "JavaScript",
    "Node.js"
  ];

  const jobs = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      date: "July 2024 - Present",
      description: "Cybeysecurity Applications Development Team"
    },
    {
      title: "Cybersecurity Engineer Intern",
      company: "Bank of America",
      date: "June 2023 - August 2023",
      description: "Network Security Team"
    },
    {
      title: "Software Engineer Intern",
      company: "PwC",
      date: "June 2022 - August 2022",
      description: "Web Applications Consulting Team"
    }
  ];

  const image = "../../public/about_img.jpg"

  return (
    <section className="w-full min-h-screen pt-4 border-t-2 border-b-2 border-solid 
        border-dark dark:border-light flex flex-col md:flex-row items-center justify-center 
        text-dark dark:text-light"
    >
      <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-2rem)]">
      {/* Left side: Picture and Introduction */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
        <img 
          src="about_img.jpg" 
          alt="img" 
          className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-lg mb-4" 
        />
        
        <p className="text-left mt-4">
          Hi! I'm Jonathan. A recent grad from the University of Maryland, College Park.
          I majored in Computer Science with a concentration in Cybersecurity and a minor in 
          ACES (Advanced Cybersecurity Experience for Students). 
        </p>
        <p className="text-left mt-4">
          I worked alongside the UMD Office of Multi-Ethnic Student Education to foster and increase minority representation in CS
          through tutoring undergrad computer science courses and supporting the internal database 
          of the University of Maryland Hispanic and Black organization under UMD - OMSE 
          (Office of Multi-Ethnic Student Education): College Success Scholars.
        </p>
        <p className="text-left mt-4">
          I currently work as a Software Engineer at Bank of America supporting and building internal Cybersecurity Applications.
        </p>
      </div>

        {/* Horizontal Line Divider for small screens */}
        <div className="block md:hidden w-full h-px bg-black dark:bg-light my-4"></div>
        {/* Vertical Line Divider for larger screens */}
        <div className="hidden md:flex w-px bg-black dark:bg-light mx-4"></div>

        {/* Right side: Education, Experience, and Skills */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          {/* Education Section */}
          <div className="p-6 rounded-lg w-full max-w-lg mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Education</h2>
            <div className="flex justify-between items-start">
              {/* Left Side Content */}
              <div className="flex flex-col">
                <span className="font-bold">University of Maryland</span>
                <span className="text-dark dark:text-light mt-1">B.S. Computer Science - Cybersecurity Concentration</span> {/* Added margin for spacing */}
              </div>
              
              {/* Right Side Content */}
              <span className="text-accent dark:text-accentDark font-light">August 2020 - May 2024</span>
            </div>
          </div>

          {/* Experience Section with Timeline */}
          <div className="w-full p-4 rounded-lg max-w-lg relative mb-2">
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
          <div className="p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Skills</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map(skill => (
                <Link
                  key={skill}
                  href={`/categories/${skill}`}
                  className="inline-block py-2 sm:py-3 px-6 sm:px-10 bg-accent dark:bg-accentDark 
                      text-light dark:text-dark rounded-full capitalize font-semibold 
                      border-2 border-solid border-light dark:border-dark hover:scale-105 transition-all 
                      ease duration-200 text-sm sm:text-base"
                >
                  {skill}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}