// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")

const nextConfig = {
    compiler:{
        removeConsole: true,
    }
};

module.exports = withContentlayer({ ...nextConfig });
