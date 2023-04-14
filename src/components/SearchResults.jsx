import { useItems } from "../state/ItemsContext";
import TitleCard from "./TitleCard";

export default function SearchResults({ searchValue }) {
  const { items } = useItems();

  const results = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const list = results.map((item) => <TitleCard key={item.id} item={item} />);

  return (
    <div className="search-results">
      {results.length !== 0 ? (
        list
      ) : (
        <p>Your search for "{searchValue}" did not have any matches. </p>
      )}
    </div>
  );
}
