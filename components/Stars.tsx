import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ ratingSummary = 0 }) => {
  const stars = ratingSummary / 20;
  const tempStars = Array.from({ length: 5 }, (_, index) => {
  const number = index + 1;

    return (
      <span key={index}>
        {stars >= number ? (
          <FaStar color="gold" />
        ) : stars >= number - 0.5 ? (
          <FaStarHalfAlt color="gold" />
        ) : (
          <FaRegStar color="gold" />
        )}
      </span>
    );
  });

  return <div className="flex">{tempStars}</div>;
};

export default Stars;
