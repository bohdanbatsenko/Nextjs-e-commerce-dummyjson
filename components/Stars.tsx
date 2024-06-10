
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ stars = { rate: "" } }) => {
  const { rate } = stars;

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    const rateNumber = parseFloat(rate);
    return (
      <span key={index}>
        {rateNumber >= index + 1  ? (
          <FaRegStar />
        ) : rateNumber >= number ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
    );
  });

  return <div>{tempStars}</div>;
};

export default Stars;