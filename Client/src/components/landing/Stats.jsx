const STATS = [
  { value: '1,000+', label: 'Vehicles Tracked'       },
  { value: '5K+',    label: 'Services Logged'         },
  { value: '99.9%',  label: 'Uptime Guaranteed'       },
  { value: '24 / 7', label: 'AI Assistant Available'  },
]

export default function Stats() {
  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl lg:text-5xl font-extrabold text-white
                             mb-2 tracking-tight leading-none">
                {value}
              </p>
              <p className="text-sm font-medium text-primary-light">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}