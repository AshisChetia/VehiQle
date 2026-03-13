import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
  label, id, type = 'text', placeholder, value, onChange,
  required = false, error, hint, icon: Icon,
  className = '', disabled = false, ...rest
}) {
  const [showPwd, setShowPwd] = useState(false);
  const isPwd      = type === 'password';
  const inputType  = isPwd ? (showPwd ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-slate-700 ml-0.5">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Icon size={16} />
          </span>
        )}

        <input
          id={id} type={inputType} placeholder={placeholder}
          value={value} onChange={onChange} required={required}
          disabled={disabled}
          className={`
            w-full h-12 rounded-2xl border bg-white text-slate-900 text-sm font-medium
            placeholder-slate-400 transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${Icon   ? 'pl-11' : 'pl-5'} ${isPwd ? 'pr-12' : 'pr-5'}
            ${error  ? 'border-danger/60 focus:border-danger focus:ring-danger/10' : 'border-slate-200'}
          `}
          {...rest}
        />

        {isPwd && (
          <button
            type="button" onClick={() => setShowPwd(p => !p)}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {hint  && !error && <p className="text-xs text-slate-500 ml-1">{hint}</p>}
      {error &&           <p className="text-xs text-danger   ml-1 font-medium">{error}</p>}
    </div>
  );
}