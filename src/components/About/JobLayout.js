import React from 'react';

const JobLayout = ({ title, company, date, description }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        {/* Job Title and Date */}
        <div className="flex flex-col">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
        </div>
        <span className="text-accent dark:text-accentDark text-sm font-light">{date}</span>
      </div>
      <p className="mt-2 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default JobLayout;