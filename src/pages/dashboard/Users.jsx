import { useEffect, useState, useMemo } from "react";

// Fake Api Function
function fetchUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Aditya Kumar Pandey", email: "aditya@gmail.com", role: "Admin" },
        { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", role: "User" },
        { id: 3, name: "Priya Singh", email: "priya@gmail.com", role: "User" },
        { id: 4, name: "Neha Verma", email: "neha@gmail.com", role: "Manager" },
        { id: 5, name: "Arjun Reddy", email: "arjun@gmail.com", role: "User" }, // Added for testing pagination
      ]);
    }, 1200);
  });
}

// Helper for dynamic badge colors
const getRoleBadgeColor = (role) => {
  switch (role.toLowerCase()) {
    case "admin": return "bg-red-100 text-red-800 border border-red-200";
    case "manager": return "bg-blue-100 text-blue-800 border border-blue-200";
    default: return "bg-green-100 text-green-800 border border-green-200";
  }
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  const USERS_PER_PAGE = 2;

  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, role]);

  // Optimization: Only re-filter if users, search, or role changes
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "all" || user.role.toLowerCase() === role;

      return matchesSearch && matchesRole;
    });
  }, [users, search, role]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-slate-500 animate-pulse">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">User Management</h1>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
             {/* Search Icon (Optional SVG) could go here */}
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-600">Name</th>
                <th className="p-4 font-semibold text-slate-600">Email</th>
                <th className="p-4 font-semibold text-slate-600">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{user.name}</td>
                    <td className="p-4 text-slate-600">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block w-24 py-1 text-sm text-center rounded bg-slate-300 ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-slate-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {paginatedUsers.length > 0 && (
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <span className="text-sm text-slate-600">
              Page <span className="font-semibold text-slate-900">{currentPage}</span> of{" "}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}