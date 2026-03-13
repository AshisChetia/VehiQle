import { Bot, Wrench, ShieldCheck } from 'lucide-react';
import Card from '../ui/Card';

export default function Features() {
  const features = [
    { icon: Bot, title: "Gemini AI Assistant", desc: "Ask questions about weird noises or check engine lights. Get expert advice instantly." },
    { icon: Wrench, title: "Service History", desc: "Log oil changes, brakes, and tires. VehiQle automatically tracks your mileage intervals." },
    { icon: ShieldCheck, title: "Predictive Alerts", desc: "Never miss a service. Receive smart alerts based on your vehicle's specific history." }
  ];

  return (
    <section id="features" className="py-32 px-4 max-w-7xl mx-auto border-t border-slate-900/5">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Intelligent Car Care</h2>
        <p className="text-slate-500 mt-5 text-xl font-light">Everything you need to keep your car running perfectly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <Card key={idx} className="group cursor-default">
            <div className="w-16 h-16 bg-honeydew-100 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:-translate-y-2 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
              <feat.icon size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
            <p className="text-slate-600 font-light leading-relaxed text-lg">{feat.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}