import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import logo from '../../assets/icons/VehiQleLogo.png';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex selection:bg-accent selection:text-white">
      {/* Left Side: Branding / Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/40 via-primary to-primary/90"></div>
        
        <Link to="/" className="relative z-10 flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
          <img src={logo} alt="VehiQle" className="h-10 w-10 scale-[1.6] origin-left filter brightness-0 invert" />
          <span className="font-heading font-bold text-2xl tracking-tight text-white">VehiQle</span>
        </Link>

        <div className="relative z-10 text-white max-w-lg">
          <h2 className="text-5xl font-bold leading-tight mb-6">Welcome back to intelligent car care.</h2>
          <p className="text-primary-100 text-lg font-light opacity-90">
            Log in to check your predictive maintenance timeline and chat with your AI mechanic.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-honeydew-50 relative">
        <Link to="/" className="absolute top-8 left-8 lg:hidden flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-3">Sign in</h1>
            <p className="text-slate-500 text-lg">Enter your details to access your garage.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <Input label="Email address" id="email" type="email" placeholder="john@example.com" required />
            <Input label="Password" id="password" type="password" placeholder="••••••••" required />
            
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary" />
                <span className="text-sm text-slate-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" className="w-full mt-8 shadow-[0_8px_30px_rgb(15,81,50,0.2)]">
              Sign in to VehiQle
            </Button>
          </form>

          <p className="mt-10 text-center text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline underline-offset-4">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}