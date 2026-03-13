import { ClipboardEdit, Sparkles, UserPlus } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    Icon:   UserPlus,
    title:  'Create Your Account',
    desc:   'Sign up for free in under a minute. No credit card needed — just your name and email.',
  },
  {
    number: '02',
    Icon:   ClipboardEdit,
    title:  'Add Your Vehicle & Logs',
    desc:   'Register your car and start logging service history — oil changes, tire rotations, brakes, and more.',
  },
  {
    number: '03',
    Icon:   Sparkles,
    title:  'Get AI-Powered Insights',
    desc:   'VehiQle analyzes your data and gives you personalized predictions, alerts, and maintenance advice.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-honeydew">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-block rounded-full border border-primary-muted bg-white
                           px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-5">
            Up and running in{' '}
            <span className="gradient-text">3 minutes.</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            No complicated setup. No learning curve. Just add your car and let VehiQle
            handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Dashed Connector (desktop only) */}
          <div className="absolute top-[3.25rem] left-[25%] right-[25%] hidden md:block pointer-events-none">
            <div className="h-px border-t-2 border-dashed border-primary-muted" />
          </div>

          {STEPS.map(({ number, Icon, title, desc }) => (
            <div key={number} className="relative flex flex-col items-center text-center group">

              {/* Icon Circle */}
              <div className="relative mb-7 z-10">
                <div className="flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-3xl
                                bg-white shadow-lg shadow-primary/10 border border-primary-muted/40
                                transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20
                                group-hover:border-primary-muted group-hover:-translate-y-1">
                  <Icon size={32} className="text-primary" />
                </div>
                <span className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center
                                  rounded-full bg-primary text-xs font-bold text-white shadow-md">
                  {number.slice(1)}
                </span>
              </div>

              <h3 className="font-display text-lg font-semibold text-gray-900 mb-3">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}