// components/UserList.tsx

// This type should ideally be shared from a central types file (e.g., models/types.ts)
type User = {
  _id: string;
  name?: string | null;
  email: string;
};

type UserListProps = {
  users?: User[];
};

export default function UserList({ users = [] }: UserListProps) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user._id} className="bg-white p-3 rounded-lg shadow">
          <strong className="font-semibold text-gray-800">{user.name || user.email || "User"}</strong>
          <div className="text-xs text-gray-500">{user.email}</div>
        </li>
      ))}
    </ul>
  );
}
