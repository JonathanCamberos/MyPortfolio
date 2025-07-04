

/* Here is all the required metaData that is important for the blog
   We will create it as a constant, as its shared across static pages
   such as blogs and the rest of the routes/pages

   
*/
const siteMetadata = {
    title: 'jonathancamberos-portfolio',
    author: 'jonathancamberos',
    headerTitle: 'jonathancamberos-portfolio-header',
    description: 'jonathan camberos software engineer portfolio',
    language: 'en-us',
    theme: 'dark', // system, dark or light
    siteUrl: 'https://jcmyportfolio-jcprojects.vercel.app/', /* update w/ final url */
    siteLogo: '/logo/cat30.png',
    socialBanner: '/social-banner.png', // add social banner in the public folder
    //socialBanner: '/social-banner.png', // add social banner in the public folder
    email: '', 
    github: 'https://github.com/JonathanCamberos',
    linkedin: 'https://www.linkedin.com/in/jonathancamberos/',
    leetcode: 'https://LeetCode.com/u/jonathancamberos/',
    locale: 'en-US'
  }
  
  module.exports = siteMetadata
