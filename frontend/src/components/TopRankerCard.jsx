
export default function TopRankerCard({ user, rank }) {
    const colors = ["bg-yellow-200", "bg-gray-200", "bg-orange-200"];
    const medals = ["🥇", "🥈", "🥉"];
  
    return (
      <div className={`flex flex-col items-center justify-center ${colors[rank - 1]} border rounded-xl px-4 py-3 min-w-[120px]`}>
        <div style={{ fontSize: 28 }}>{medals[rank - 1]}</div>
        <div className="font-bold">{user.name}</div>
        <div>Rank {user.rank}</div>
        <div>{user.totalPoints} pts</div>
      </div>
    );
}