import React from 'react'

const JobLayout = ({ title, company, date, description }) => {
    return (
      <div className="mb-6">
        <div className="relative">
          <div className="absolute w-3 h-3 bg-orange-500 dark:bg-yellow-400 rounded-full -left-6 top-1"></div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{date}</p>
          <p className="mt-2 dark:text-gray-400">{description}</p>
        </div>
      </div>
    );
  };
  
  export default JobLayout;