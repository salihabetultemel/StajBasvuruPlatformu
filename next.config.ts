import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Webpack'in bazı modülleri tam olarak belirlememesini sağla
    config.module?.rules?.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // chrome-aws-lambda'yı harici modül olarak tanımla
    config.externals = [...(config.externals || []), "chrome-aws-lambda"];

    return config;
  },
};

export default nextConfig;
