import siteMetadata from '../../utils/siteMetaDataFile'

/* we dont need the generateMetadata func bc this page is not dynamic */

import Link from 'next/link';
import cx from '../../../src/utils';

export default function About() {
  const skills = [
    "React.js",
    "SQL",
    "Python",
    "Java",
    "JavaScript",
    "Node.js"
  ];


  return (
    <section className="w-full h-auto md:h-[100vh] pt-4 border-t-2 border-b-2 border-solid 
        border-dark dark:border-light flex flex-col md:flex-row items-center justify-center 
        text-dark dark:text-light"
    >
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left side: Picture and Introduction */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          <img src="path-to-your-image.jpg" alt="img" className="rounded-lg mb-4" />
          <p className="text-center">todo- introduction.</p>
        </div>

        {/* Horizontal Line Divider for small screens */}
        <div className="block md:hidden w-full h-px bg-black dark:bg-light my-4"></div>

        {/* Vertical Line Divider for larger screens */}
        <div className="hidden md:flex w-px bg-black mx-4"></div>

        {/* Right side: Education, Experience, and Skills */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          {/* Education Section */}
          <div className="p-6 rounded-lg w-full max-w-lg mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Education</h2>
            <p>was i even educated?</p>
          </div>

          {/* Experience Section with Timeline */}
          <div className="p-6 rounded-lg w-full max-w-lg relative mb-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Experience</h2>
            
            {/* Timeline */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gray-300"></div>
            
            {/* Timeline Content */}
            <div className="ml-8"> {/* Increased margin to give more space */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-orange-500 dark:bg-yellow-400 rounded-full -left-6 top-1"></div>
                  <h3 className="font-semibold">Job</h3>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="text-sm text-gray-600">Year - Year</p>
                  <p className="mt-2">Brief description</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-orange-500 dark:bg-yellow-400 rounded-full -left-6 top-1"></div>
                  <h3 className="font-semibold">Job</h3>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="text-sm text-gray-600">Year - Year</p>
                  <p className="mt-2">Brief description</p>
                </div>
              </div>

              {/* Add more experience items as needed */}
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
                      ease duration-200 text-sm sm:text-base
                      "
                  
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