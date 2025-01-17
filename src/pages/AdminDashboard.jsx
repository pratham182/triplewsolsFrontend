import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import Message from "../components/Message";
import InputField from "../components/InputField";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [error, setError] = useState("");


  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      if (response.success) {
        setUsers(response.data.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    }
  };

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      loadUsers(); 
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "test" && password === "test123") {
      setIsLoggedIn(true);
      setError("");
      setAdminInfo({});

      localStorage.setItem("isLoggedIn", "true");

      await loadUsers(); 
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUsers([]);
  };

  return (
    <div className="flex justify-center h-screen">
      {!isLoggedIn ? (
        <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Login
            </button>
          </form>
          {error && <Message text={error} type="error" />}
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-1 px-3 text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
            >
              Logout
            </button>
          </div>
          {users.length === 0 ? (
            <p className="text-center text-gray-600">No user submissions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      Social Media Handle
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-medium">
                      Uploaded Images
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.socialMediaHandle}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-2">
                          {user.images.map((image, i) => (
                            <a
                              href={image}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={i}
                            >
                              <img
                                src={image}
                                alt={`Uploaded ${i + 1}`}
                                className="w-16 h-16 rounded-lg shadow-md border"
                              />
                            </a>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
