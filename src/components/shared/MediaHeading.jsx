import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function MediaHeading({ label }) {
  return (
    <h2 className="media-heading">
      <a>
        {label}
        <span>
          Explore All
          <FontAwesomeIcon icon={solid("angle-right")} />
        </span>
      </a>
    </h2>
  );
}
