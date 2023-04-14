import { useItems } from "../state/ItemsContext";
import MediaCarousel from "./MediaCarousel";
import MediaHeading from "./shared/MediaHeading";

export default function TopTen() {
  const { items } = useItems();

  const isTopTen = true;

  const sortedItems = items.sort((a, b) => b.views - a.views);
  const topTen = sortedItems.slice(0, 10);

  return (
    <section className="top-ten">
      <h2 className="media-heading">Top 10 in Sweden</h2>
      <MediaCarousel items={topTen} isTopTen={isTopTen} />
    </section>
  );
}
