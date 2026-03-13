import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <footer className="py-12 text-center text-slate-500 text-sm border-t border-slate-100 bg-white">
        <p>© {new Date().getFullYear()} VehiQle. Built for safer, smarter driving.</p>
      </footer>
    </div>
  );
}