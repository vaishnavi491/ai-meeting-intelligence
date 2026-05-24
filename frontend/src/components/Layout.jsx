import { Link, Outlet } from "react-router-dom";

function Layout() {

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6">

        <h1 className="text-2xl font-bold mb-10">
          AI Meetings
        </h1>

        <nav className="space-y-4">

          <Link
            to="/dashboard"
            className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700"
          >
            Dashboard
          </Link>

          <Link
            to="/meetings"
            className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700"
          >
            Meeting History
          </Link>

          <Link
            to="/chat"
            className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700"
          >
            AI Chat
          </Link>

          <Link
            to="/upload"
            className="block rounded-xl bg-slate-800 px-4 py-3 hover:bg-slate-700"
          >
            Upload Meeting
          </Link>

        </nav>
      </aside>

      {/* Main Content */}

      <main className="flex-1 p-8 overflow-y-auto">

        <Outlet />

      </main>

    </div>
  );
}

export default Layout;