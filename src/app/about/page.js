import siteMetadata from '../../utils/siteMetaDataFile'

/* we dont need the generateMetadata func bc this page is not dynamic */

export const metadata = {
  title: "Contact Me",
  description: `Contact me through this form or email me at ${siteMetadata.email}`
}

export default function About() {
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
        <div className="block md:hidden w-full h-px bg-black my-4"></div>

        {/* Vertical Line Divider for larger screens */}
        <div className="hidden md:flex w-px bg-black mx-4"></div>

        {/* Right side: Education and Experience */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-4">
          {/* Education Section */}
          <div className="p-6 rounded-lg w-full max-w-md mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Education</h2>
            <p>was i even educated?</p>
          </div>

          {/* Experience Section with Timeline */}
          <div className="p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Experience</h2>
            
            {/* Timeline */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gray-300"></div>
            
            {/* Timeline Content */}
            <div className="ml-6">
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
        </div>
      </div>
      
    </section>
  );
}