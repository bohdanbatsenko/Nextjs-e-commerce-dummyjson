import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ stars = 0 }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
  const number = index + 1;

    return (
      <span key={index}>
        {stars >= number ? (
          <FaStar />
        ) : stars >= number - 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return <div className="flex">{tempStars}</div>;
};

export default Stars;
