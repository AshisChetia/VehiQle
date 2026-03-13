import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-28 bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center
                        rounded-2xl bg-primary shadow-lg shadow-primary/40">
          <Zap size={28} className="text-white" fill="white" />
        </div>

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight
                       text-white mb-6 leading-tight">
          Start caring for your car
          <span className="text-primary-light block mt-1">the smart way.</span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Join car owners who use VehiQle to stay on top of maintenance, extend vehicle life,
          and avoid costly repairs — all powered by AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary
                       px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/30
                       transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl"
          >
            Create Free Account
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-xl border border-gray-700
                       px-8 py-4 text-sm font-semibold text-gray-400 transition-all duration-200
                       hover:border-gray-500 hover:text-white"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </section>
  )
}