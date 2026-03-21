import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  title: 'Vaibhav Patel | Full-Stack Web Developer',
  description: 'High-performance Full-Stack Developer and Computer Engineering student specializing in secure realtime systems, scalable architecture, and production-grade web applications.',
  keywords: ['Full Stack Developer', 'React', 'Next.js', 'Three.js', 'Node.js', 'Portfolio', 'Vaibhav Patel', 'Computer Engineering'],
  authors: [{ name: 'Vaibhav Patel' }],
  creator: 'Vaibhav Patel',
  openGraph: {
    title: 'Vaibhav Patel | Full-Stack Web Developer',
    description: 'Explore production-grade full-stack architectures and deep systems engineering.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Patel | Full-Stack Web Developer',
    description: 'High-performance Full-Stack Developer building secure, scalable web applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030712',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#020408] text-white antialiased overflow-hidden selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
