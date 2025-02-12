import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between p-2 border-b">
            <span>{user.username} - {user.email}</span>
            <button className="text-red-500" onClick={() => handleDelete(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
