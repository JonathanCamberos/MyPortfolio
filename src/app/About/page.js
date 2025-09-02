import Link from 'next/link';

export default function About() {
  const personalStatement = `I’m Jonathan, a backend software engineer in the Bank of America Security Operations and Threat Response (SOTR) group. My current work focuses on building internal siem/soar applications in c#/.net.`;

  const educationStatement = `I completed my B.S. in Computer Science with a concentration in Cybersecurity at the University of Maryland, College Park alongside a minor in Advanced Cybersecurity Experience for Students (ACES).`;

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
      team: "Network Security",
      date: "2023",
      description: "Network Security",
      link: "https://business.bofa.com/en-us/content/fraud-prevention-and-cyber-security-solutions.html"
    },
    {
      title: "Software Engineer",
      company: "PwC",
      team: "Cybersecurity Applications Consulting",
      date: "2022",
      description: "Developed secure web applications Consulting",
      link: "https://www.pwc.com/us/en/services/consulting/cybersecurity-risk-regulatory.html"
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 text-dark dark:text-light bg-light dark:bg-dark">
      <div className="max-w-3xl w-full mx-auto">
        {/* Introduction Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Hi, nice to meet you!</h1>
          <p className="text-lg leading-relaxed">{personalStatement}</p>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <p className="text-lg leading-relaxed">{educationStatement}</p>
        </div>

        {/* Current Role Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
          <p className="text-lg mb-6">
            Currently working as a {currentRole.title} at {currentRole.company} in{" "}
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
                  {exp.company} - {exp.team}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}