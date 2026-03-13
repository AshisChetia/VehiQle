import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import logo from '../../assets/icons/VehiQleLogo.png';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-row-reverse selection:bg-accent selection:text-white">
      {/* Right Side: Branding (Reversed for variation) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-slate-900 to-slate-900"></div>
        
        <div className="relative z-10 flex justify-end">
          <Link to="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
            <span className="font-heading font-bold text-2xl tracking-tight text-white">VehiQle</span>
            <img src={logo} alt="VehiQle" className="h-10 w-10 scale-[1.6] origin-right filter brightness-0 invert" />
          </Link>
        </div>

        <div className="relative z-10 text-white max-w-lg ml-auto text-right">
          <h2 className="text-5xl font-bold leading-tight mb-6">Never miss an oil change again.</h2>
          <p className="text-slate-400 text-lg font-light">
            Join thousands of smart drivers who let AI manage their vehicle's health. Setup takes less than 2 minutes.
          </p>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-white relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Create your account</h1>
            <p className="text-slate-500 text-lg">Start tracking your vehicle's health for free.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First name" id="firstName" placeholder="John" required />
              <Input label="Last name" id="lastName" placeholder="Doe" required />
            </div>
            <Input label="Email address" id="email" type="email" placeholder="john@example.com" required />
            <Input label="Password" id="password" type="password" placeholder="Create a strong password" required />
            
            <Button type="submit" size="lg" className="w-full mt-8 shadow-[0_8px_30px_rgb(15,81,50,0.2)]">
              Create Account
            </Button>
            
            <p className="text-xs text-slate-500 text-center mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <p className="mt-10 text-center text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}