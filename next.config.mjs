/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// unoptimized: true,
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.themoviedb.org',
				pathname: '/t/p/original/**',
			},
		],
	},
};

export default nextConfig;
