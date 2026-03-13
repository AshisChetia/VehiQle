import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center px-4 z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="bg-honeydew-100 text-primary px-5 py-2 rounded-full text-sm font-semibold tracking-wide border border-primary/10 mb-8 inline-flex items-center gap-2 animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        Powered by Gemini AI
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] max-w-5xl text-slate-900 tracking-tight">
        Your Vehicle's Health, <br/> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Predictive & Perfected.
        </span>
      </h1>
      
      <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl font-light leading-relaxed">
        VehiQle tracks your service history and uses advanced AI to predict maintenance before breakdowns happen. Safe, smart, and beautifully simple.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Button href="/signup" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
          Add Your Vehicle
        </Button>
        <Button href="/login" variant="outline" size="lg" className="w-full sm:w-auto bg-white">
          Chat with AI Mechanic
        </Button>
      </div>
    </section>
  );
}