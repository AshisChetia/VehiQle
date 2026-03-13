import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function PageWrapper({ children, title, description, action }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar title={title} />

        {/* Content shifted below fixed navbar */}
        <main className="flex-1 mt-16 p-8">

          {/* Page Header */}
          {title && (
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {title}
                </h1>
                {description && (
                  <p className="text-slate-500 mt-2 text-base font-medium">{description}</p>
                )}
              </div>
              {action && <div className="flex-shrink-0 ml-4">{action}</div>}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}