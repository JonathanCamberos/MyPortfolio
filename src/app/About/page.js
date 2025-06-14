import Link from 'next/link';

export default function About() {
  const personalStatement = `Hi, nice to meet you! I’m Jonathan, a Software Engineer at Bank of America. My current work focuses on supporting and building internal cybersecurity applications.`;

  const educationStatement = `I completed my B.S. in Computer Science at the University of Maryland with a concentration in Cybersecurity and a minor in ACES (Advanced Cybersecurity Experience for Students).  `;

  const currentRole = {
    title: "Software Engineer",
    company: "Bank of America",
    date: "2024",
    description: "Security Operations and Threat Response",
    link: "https://business.bofa.com/en-us/content/fraud-prevention-and-cyber-security-solutions.html"
  };

  const pastExperience = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      date: "2023",
      description: "Network Security",
      link: "https://business.bofa.com/en-us/content/fraud-prevention-and-cyber-security-solutions.html"
    },
    {
      title: "Software Engineer",
      company: "PwC",
      date: "2022",
      description: "Developed web applications Consulting",
      link: "https://www.pwc.com/us/en.html"
    },
  ];

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-dark dark:text-light bg-light dark:bg-dark"
    >
      <div className="max-w-5xl w-full">

        <div className="py-10"></div>

        {/* Introduction Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg leading-relaxed">{personalStatement}</p>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <p className="text-lg leading-relaxed">{educationStatement}</p>
        </div>

        {/* Current Role Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
          <p className="text-lg mb-6">
            I am currently working as a {currentRole.title} at {currentRole.company} in{" "}
            <Link
              href={currentRole.link}
              className="text-accent dark:text-accentDark no-underline hover:underline hover:text-accentLight"
            >
              {currentRole.description}
            </Link>.
          </p>

          <p className="text-lg mb-6">In the past, I’ve interned at:</p>
          <ul className="list-disc pl-6 space-y-2">
            {pastExperience.map((exp, index) => (
              <li key={index} className="flex gap-2">
                <span>({exp.date})</span>
                <Link
                  href={exp.link}
                  className="text-accent dark:text-accentDark no-underline hover:underline hover:text-accentLight"
                >
                  {exp.company}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}