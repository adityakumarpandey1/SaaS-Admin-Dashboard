import {NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-800 text-white p-6">
        <h2 className="text-xl font-bold">SaaS Admin</h2>
        <nav className="space-y-3">
            <NavLink
            to="/dashboard"
            end
            className={({isActive})=>
               isActive?"block text-green-400":"block"
            }
            >
                Overview
            </NavLink>
            <NavLink
            to="/dashboard/users"
            className={({isActive})=>
            isActive?"block text-green-400":"block"
            }
            >
                Users
            </NavLink>
        </nav>
      </aside>

      <main className="flex-1 bg-green-200 p-6">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Dashboard..............
        </h1>

        <Outlet />
      </main>
    </div>
  );
}
