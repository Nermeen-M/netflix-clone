import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function EmptyState() {
  return (
    <div className="empty-state">
      <FontAwesomeIcon icon={solid("folder-open")} />
      <p>There are no items, start adding!</p>
    </div>
  );
}
