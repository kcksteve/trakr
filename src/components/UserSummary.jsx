import UserTile from './UserTile';

export default function UserSummary({ priorities, users, onSelectUser }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => {
        const userPriorities = priorities.filter((p) => p.userId === user.id);
        return (
          <UserTile
            key={user.id}
            user={user}
            priorities={userPriorities}
            onSelectUser={onSelectUser}
          />
        );
      })}
    </div>
  );
}
