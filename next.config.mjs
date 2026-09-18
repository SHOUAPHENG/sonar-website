import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This project lives next to the Vite app, which has its own lockfile; pin the
  // tracing root so Next doesn't infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
  // Three.js + drei ship modern ESM; transpiling keeps Next happy across versions.
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // The site is design-led; we don't want stylistic lint rules to block a build.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
