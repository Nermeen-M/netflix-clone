export default function AdminEpisodeItem({ item }) {
  return (
    <div>
      <img src={item.thumbnail} width="150" />
      <h3>{item.title}</h3>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}
