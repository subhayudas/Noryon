import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 animated-gradient-text font-helvetica-neue">404</h1>
                  <h2 className="text-2xl font-semibold mb-4 font-helvetica-neue">Page Not Found</h2>
        <p className="mb-8 text-white/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 transition-all duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
